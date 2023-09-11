import { useState, useEffect, useRef, Fragment, memo } from 'react';
import styles from './style.less'

let timer = null
const Index = ({ columns, dataSource, rowClassName = {}, isScroll = false }) => {
    // 选中高亮
    const
        [active, setActive] = useState(null),
        [tableWarpHeight, setTableWarpHeight] = useState(0),  // table容器 高度
        [tableHeadHeight, setTableHeadHeight] = useState(0),  // table头部高度
        [tbodyHeight, setTbodyHeight] = useState(0)

    const bodyRef = useRef(null),
        scrollContainerRef = useRef(null),
        tableWarpRef = useRef(null),
        tableHeadRef = useRef(null)
    // 开启滚动
    useEffect(() => {
        if (timer) clearTimeout(timer);  // 当 useEffect 多次执行 会重复开启定时器 !
        InitialScroll(isScroll)  // 如果有真实数据 请在数据请求后 调用此方法
        let tabHeight = tableWarpRef?.current.clientHeight  // 获取表格容器的高度
        let tbodyHeight = scrollContainerRef?.current.clientHeight  // 获取 tbody 高度
        let tableHead = tableHeadRef?.current.clientHeight  // 获取表格头部的高度
        setTableWarpHeight(tabHeight)
        setTableHeadHeight(tableHead)
        setTbodyHeight(tbodyHeight)
        return () => {
            clearInterval(timer)
        }
    }, [])
    useEffect(() => {
        return () => {
            bodyRef.current.scrollTop = 0
        }
    }, [dataSource])
    // 开启滚动
    const InitialScroll = (isScroll) => {
        if (isScroll) {
            let startingTime = 30
            let scrollContainer = scrollContainerRef.current
            let initScroll = bodyRef.current
            // copyNode.innerHTML = initScroll.innerHTML;
            timer = setInterval(() => {
                if (isScroll && initScroll.scrollTop >= scrollContainer?.scrollHeight) {
                    initScroll.scrollTop = 0

                } else {
                    initScroll.scrollTop++
                }

            }, startingTime)
            // setTimer(time)
        }
    }
    // 活跃id
    const handleMouse = (flag) => {
        return () => {
            // setActive(flag)
        }
    }
    // 头部样式
    const widthAndHigh = (data) => {
        const { title, width } = data
        let newWidth = width?.toString() + 'px'
        let style = { color: '#37B6FF' }
        let padding = null;
        let color = '#ff4d4f'
        style = title === '操作' ? { padding, color, width: newWidth } : null
        return style;
    };
    // theadDom
    const theadDom = () => {
        return (
            <tr >
                {columns.map((data, index) => (
                    <th key={index} style={widthAndHigh(data)} className={styles.table_cell}>
                        {data.title}
                    </th>
                ))}
            </tr>
        )
    }
    // 不滚动
    const tableWarp = () => {
        return <table style={{ tableLayout: 'fixed' }}>
            <colgroup>
                {columns.map((data, index) => (
                    <col style={{ width: data.width }} key={index}  >

                    </col>
                ))}
            </colgroup>
            <tbody ref={scrollContainerRef} className={styles.table_tbody}>
                {tbodyDom()}
            </tbody>
        </table>
    }
    // 滚动的 table
    const tableScrollWarp = () => {
        return (
            ['相', '数', '云'].map((_, index) => (
                <table key={index} style={{ tableLayout: 'fixed' }}>
                    <colgroup>
                        {columns.map((data, index) => (
                            <col style={{ width: data.width }} key={index}  >
                            </col>
                        ))}
                    </colgroup>
                    <tbody ref={scrollContainerRef} className={styles.table_tbody}>
                        {tbodyDom()}
                    </tbody>
                </table>
            ))
        )
    }
    // tbodyDom
    const tbodyDom = () => {
        {/* 遍历数据 */ }
        return dataSource.map((data, index) => {
            // 遍历属性名称
            let property = []
            for (const key in columns) {
                if (Object.hasOwnProperty.call(dataSource, key)) {
                    const element = columns[key].dataIndex
                    property.push(element)
                }
            }
            return (
                // index % 2 接收传递过来的样式 选中样式 取的是 index 的值
                <tr style={index % 2 === 0 ? rowClassName?.oddStyle : rowClassName?.evenStyle} key={index} onMouseEnter={handleMouse(index)}
                    onMouseLeave={handleMouse(null)} className={`${styles.tbody_row} ${styles.tbody_rowLevel_0}`}>
                    {/* 遍历多少行 */}
                    {
                        columns.map((element, i) => {
                            return (
                                <Fragment key={i}>
                                    {/* index % 2 接收传递过来的样式 */}
                                    <td key={i} className={`${styles.table_cell} ${index === active && styles.tbody_rowHover}`}>
                                        {/* render 传递两个参数  data[property[i]]:文本值 data:当前选入的对象*/}
                                        {element.render ? element.render(data[property[i]], data) : data[property[i]]}
                                    </td>
                                </Fragment>
                            )
                        })
                    }
                </tr >
            )
        })
    }
    // DOM 节点
    return (
        <div ref={tableWarpRef}
            style={{ height: '100%' }} className={styles.wrapper}>
            <div className={styles.spin_nested_loading}>
                <div className={styles.container}>
                    <div className={`${styles.table}`} >
                        <div className={styles.table_container}>
                            <div ref={tableHeadRef} className={styles.table_header}>
                                <table style={{ tableLayout: 'fixed' }}>
                                    <colgroup>
                                        {columns.map((data, index) => (
                                            <col style={{ width: data.width }} key={index}  >

                                            </col>
                                        ))}
                                    </colgroup>
                                    <thead className={styles.table_thead}>
                                        {theadDom()}
                                    </thead>
                                </table>
                            </div>
                            <div onMouseEnter={() => {
                                if (timer) clearTimeout(timer);
                                clearInterval(timer)
                            }} onMouseLeave={() => {
                                if (timer) clearTimeout(timer);
                                InitialScroll(isScroll)
                            }} ref={bodyRef} id='cyclicScroll' style={{ overflow: 'auto', height: tableWarpHeight - tableHeadHeight + 'px' }} className={styles.table_body}>
                                {tbodyHeight >= (tableWarpHeight - tableHeadHeight) ? tableScrollWarp() : tableWarp()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default memo(Index) 