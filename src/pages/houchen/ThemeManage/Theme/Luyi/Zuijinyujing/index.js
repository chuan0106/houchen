import { useState, useRef, useEffect, Fragment, memo } from 'react';
import styles from './style.less'
// import logo from '@/assets/tannengxietong/logo.png'
let id = [
    1, 2, 3, 4, 5, 6
]
const tableData = [
    { name: '1号功能区', even: '未佩戴安全帽', time: '2023-05-02 08:17' },
    { name: '2号功能区', even: '已佩戴安全帽', time: '2023-05-03 09:26' },
    { name: '3号功能区', even: '未佩戴安全帽', time: '2023-05-04 14:22' },
    { name: '4号功能区', even: '已佩戴安全帽', time: '2023-05-05 05:42' },
    { name: '5号功能区', even: '未佩戴安全帽', time: '2023-05-06 20:36' },
    { name: '6号功能区', even: '未佩戴安全帽', time: '2023-05-07 16:28' }
]
let timer = null
const index = () =>
{
    const [data, setData] = useState(tableData)
    const [hovered, setHovered] = useState(false)
    const [listPanelStyle, setListPanelStyle] = useState(0)
    const [noRoll, setNoRoll] = useState(false)
    const panelRef = useRef()
    // for (const key in tableData)
    // {
    //     tableData[key].value = id[key]
    // }
    useEffect(() =>
    {
        hovered ? stopSlide() : startSlide()
        return (() =>
        {
            clearInterval(timer)
        })
    }, [hovered])
    const startSlide = () =>
    {
        let s = .6
            , c = 1e3 / 60

        let e = panelRef.current
            , t = e.clientHeight
            , i = e.parentElement.clientHeight;

        let panelTop = listPanelStyle
        i < t ? timer = setInterval(function ()
        {
            t / 2 + panelTop > 0 ? panelTop -= s : panelTop = 0,
                setListPanelStyle(panelTop)
        }, c) : setNoRoll({
            noRoll: !0
        })
    }
    const stopSlide = () =>
    {
        clearInterval(timer)
    }
    const mouseEnterHandler = () =>
    {
        setHovered(true)
    }
    const mouseLeaveHandler = () =>
    {
        setHovered(false)
    }

    const ScrollWarp = () =>
    {
        let dom = null
        dom = ['x', 'c'].map((d, i) => (
            <Fragment key={i}>
                {WarpDom()}
            </Fragment>
        ))
        return dom
    }
    const WarpDom = () =>
    {
        let dom = null
        dom = data.map((data, index) => (
            <p key={index} className={styles.list} >
                <span className={styles.tab_name}><img className={styles.logo} src={'logo'} alt="" />{data.name}</span>
                <span style={{ color: data.even !== '未佩戴安全帽' ? '#00C254' : '#F8272E' }}>{data.even}</span>
                <span >{data.time}</span>
            </p>
        ))
        return dom
    }
    return (
        <div className={styles.container}>
            <div className={styles.flex}>
                <h1 className={styles.postTitle}>
                    <div className={styles.title}>全局概览</div>
                </h1>
                <div className={styles.SelectWarp}>
                    实时
                </div></div>

            <div className={styles.tableHead}>
                <div>区域名</div>
                <div>事件</div>
                <div>发生时间</div>
            </div>
            <div className={styles.wrap} >
                <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} ref={panelRef} style={{ top: listPanelStyle }} className={styles.panel} >
                    {!noRoll ? ScrollWarp() : WarpDom()}
                </div>
            </div>
        </div>
    );
};
export default memo(index)