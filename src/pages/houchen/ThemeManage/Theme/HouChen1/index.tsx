import { FC, useState, useRef, useEffect, Fragment } from 'react'
import styles from './style.less'
import { Carousel } from 'antd';
import type { CarouselRef } from "antd/lib/carousel"
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import type { footFallType, jingxuanhaibaoType } from './types'
import { UserOutlined } from '@ant-design/icons';

import WheelAndHamster from '@/components/WheelAndHamster'
import Progress from '@/components/Progress'
import TimeSlider from '@/components/TimeSlider'
import CountUp from '../../../../../components/CountUp'
import PieChart from './PieChart'
// import MessageCard from '@/components/MessageCard'
import CardMenu from '../../../Components/CardMenu'
import MessageCard from '../../../Components/MessageCard'

import { proportion, calculatePercentage, toFixed, split_array, random } from '@/utils/js/tools'

import { menu, titles, jiaotongfangshiData, jingxuanhaibaoData, footfall1, footfall2, nianlingbiliArr, shourushuipingData } from './data'

type EChartsOption = echarts.EChartsOption;

const proportionSort = calculatePercentage(nianlingbiliArr)

const proportionData = proportion(shourushuipingData)

type Props = {

}
const Houchen: FC<Props> = () => {
    const [nianlingbiliArrData, setNianlingbiliArrData] = useState(nianlingbiliArr)
    const [messageObj, setMessageObj] = useState<null | jingxuanhaibaoType>(null);
    const carouselRef = useRef<CarouselRef>(null)
    const [time, setTime] = useState(new Date().getHours())
    const [menuActive, setMenuActive] = useState(1)
    const [menuData, setMenuData] = useState<footFallType[]>([]);

    // 每次时间改变，更新随机数状态
    useEffect(() => {
        const updatedData = nianlingbiliArr.map(item => ({
            ...item,
            num: random(item.num - 3, item.num + 3),
        }));
        setNianlingbiliArrData(updatedData)
    }, [time])
    //  修改景区实时客流左上数据
    useEffect(() => {
        const updatedFootfallData = footfall2.map((data) => {
            if (data.id === 3) {
                return { ...data, delivery: time >= 1 ? random(149, 179) : 0 };
            }
            return data;
        });
        const result = menuActive === 1 ? footfall1 : updatedFootfallData
        setMenuData(result);
    }, [menuActive, time])
    useEffect(() => {
        const channel = new BroadcastChannel('time')
        channel.onmessage = e => {
            const { data: time } = e
            setTime(parseFloat(time))
        }
        return () => {
            channel.close(); // 在组件卸载时关闭 channel
        };
    }, [])

    useEffect(() => {
        var chartDom = document.getElementById('main')!;
        var myChart = echarts.init(chartDom);
        var option: EChartsOption;

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                },
            },
            grid: {
                left: '10%',
                right: '5%',
                bottom: '10%',
                top: '15%'
            },
            toolbox: {
                feature: {
                    // dataView: { show: true, readOnly: false },
                    // magicType: { show: true, type: ['line', 'bar'] },
                    // restore: { show: true },
                    // saveAsImage: { show: true }
                }
            },
            legend: {
                show: true, // 显示图例
                top: 'top', // 控制图例的位置
                orient: 'horizontal', // 设置图例的排列方式，可以是水平（'horizontal'）或垂直（'vertical'）
                data: ['数量', '金额', '占比'].map(function (project) {
                    return {
                        name: project,
                        icon: 'pin',
                        textStyle: {
                            color: '#fff'
                        }
                    };
                })
            },
            xAxis: [
                {
                    type: 'category',
                    data: proportionData.map(item => item.name),
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel: {
                        color: '#fff',
                        fontSize: 13,
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '金额',
                    // min: 0,
                    // max: 250,
                    // interval: 50,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#eee",
                        },
                    },
                },
                {
                    type: 'value',
                    name: '占比',
                    // min: 0,
                    // max: 25,
                    // interval: 5,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#eee",
                        }
                    },
                }
            ],
            series: [

                {
                    name: '数量',
                    type: 'bar',
                    yAxisIndex: 0,  // 使用第一个y轴显示
                    tooltip: {
                        valueFormatter: function (value) {
                            return value as number + ' 人';
                        }
                    },
                    itemStyle: {
                        borderRadius: [8, 8, 0, 0],
                        color: 'rgb(238,162,164)',  // 修改柱状图的颜色
                    },
                    data: proportionData.map(item => item.num)
                },
                {
                    name: '金额',
                    type: 'bar',
                    yAxisIndex: 0,  // 使用第一个y轴显示
                    tooltip: {
                        valueFormatter: function (value) {
                            return value as number + ' 万元';
                        },
                    },

                    itemStyle: {
                        borderRadius: [8, 8, 0, 0],
                        color: 'rgb(43,115,175)',  // 修改柱状图的颜色

                    },

                    data: proportionData.map(item => item.money as number / 10000)
                },
                {
                    name: '占比',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value as number + ' %';
                        },
                    },
                    itemStyle: {
                        color: 'rgb(46,49,124)',  // 修改柱状图的颜色
                    },

                    data: proportionData.map(item => toFixed(item.percentage, 2))
                }
            ],


        };


        option && myChart.setOption(option);

    }, [])

    const openDetails = (dataObj: jingxuanhaibaoType) => {
        setMessageObj(dataObj)
    }

    const closeHandler = (flag: null) => {
        setMessageObj(flag)
    }

    const menuHandler = (id: number) => {
        setMenuActive(id)
    }

    const SliderChange = (time: string) => {
        const timeResult = parseFloat(time)
        setTime(timeResult)
    }
    const CarouselDOM = () => {
        let newData = split_array(jingxuanhaibaoData, 1)
        return (
            <Carousel autoplay autoplaySpeed={5000} ref={carouselRef}>
                {
                    newData.map((item, index) => {
                        return <div key={index} className={styles.content}>
                            {item.map((data: any, i: any) => {
                                return (
                                    <div key={i} className={styles.core} >
                                        <div onClick={() => { openDetails(data) }} className={styles.video}>
                                            <img src={data.img} alt="" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    })
                }
            </Carousel>
        )
    }
    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.core}>
                    <div className={`${styles.theme_box} ${styles.jiaotongfangshi}`} >
                        <div className={styles.head}>
                            <div className={styles.head_text}>{titles[0]}</div>
                            <WheelAndHamster size={'3px'} />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.content_box}>
                                <div className={`${styles.flex1} ${styles.box_left}`}>
                                    {jiaotongfangshiData.map(item => (
                                        <div key={item.id} className={styles.box_content}>
                                            <img src={item.img} alt="" />
                                            <div style={{ fontSize: time <= 2 ? '17px' : '15px' }} className={styles.value}>
                                                <span>{item.name}</span>
                                                <CountUp numerical={time * item.value} unit={'辆'} />
                                                {/* <span>{time * item.value}辆</span> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={`${styles.flex1} ${styles.box_right}`}>
                                    <PieChart data={jiaotongfangshiData} time={time} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.theme_box} ${styles.imgs}`} >
                        <div className={styles.head}>
                            <div className={styles.head_text}>{titles[1]}</div>
                            <WheelAndHamster size={'3px'} />
                        </div>
                        <div className={`${styles.content}`} >
                            <div className={styles.overall}  >
                                <div onClick={() => { carouselRef?.current?.prev() }} className={`${styles.inBlock} ${styles.btn}`} >
                                    <LeftCircleOutlined width={50} height={50} />
                                </div>

                                <div className={`${styles.inBlock} ${styles.w340}`}>
                                    {CarouselDOM()}
                                </div>
                                <div onClick={() => { carouselRef?.current?.next() }} className={`${styles.inBlock} ${styles.btn}`}>
                                    <RightCircleOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.theme_box} ${styles.chart}`}>
                        <div className={styles.head}>
                            <div className={styles.head_text}>{titles[2]}</div>
                            <WheelAndHamster size={'3px'} />
                        </div>
                        <div className={styles.content}>
                            <div id='main' className={styles.column}>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.theme_box} ${styles.nianlingbili}`} >
                        <div className={styles.head}>
                            <div className={styles.head_text}>{titles[3]}</div>
                            <WheelAndHamster size={'3px'} />
                        </div>
                        <div className={styles.content}>
                            {nianlingbiliArrData.map((item, index) => {
                                // 计算每个时间段的比例
                                const adjustedNum = item.num * time;
                                const total = nianlingbiliArr.reduce((sum, item) => sum + (item.num * time), 0);
                                const ratio = total !== 0 ? (adjustedNum / total) * 100 : 0;

                                return (
                                    <div key={item.id} className={styles.box}>
                                        <div style={{
                                            backgroundPositionX: 0,
                                            // 循环精灵图
                                            backgroundPositionY: 0 - index * 70 + 'px'
                                        }} className={styles.img}></div>
                                        <div className={styles.text}>{item.name}</div>
                                        <div className={styles.progress} >
                                            <div style={{ width: '100%' }}>
                                                <Progress percent={toFixed(ratio, 0)} unSelectedColor={'#000'} strokeColor={{
                                                    from: 'rgb(161, 29, 102)',
                                                    to: 'rgb(83, 177, 36)',
                                                }}
                                                    value={time * item.num}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* <div className={`${styles.menu} `} >
                        <CardMenu />
                    </div> */}
                </div>
            </div>

            {/* 左上数值 */}
            <div className={styles.container_left}>
                <div className={styles.core}>
                    {menuData.map(item => {
                        const result = menuActive != 1 && item.flag
                        return (
                            <div key={item.id} className={styles.item_box}>
                                <UserOutlined />
                                <div className={styles.content}>
                                    <p className={styles.title}>{item.name}</p>
                                    <CountUp numerical={result ? time * item.delivery : item.delivery} unit={item.unit} styleB={{ fontSize: '24px' }} />
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

            {/* 右上菜单栏 */}
            <div className={styles.menu_box}>
                {menu.map(item => (
                    <div key={item.id} onClick={() => { menuHandler(item.id) }} className={`${styles.menu} ${menuActive === item.id && styles.active}`}> {item.name}</div>
                ))}
            </div>

            {/* 弹窗 */}
            {messageObj && (
                <div className={styles.message}>
                    <MessageCard closeHandler={closeHandler} messageObj={messageObj} />
                </div>
            )}

            {/* 时间轴 */}
            {menuActive === 2 && (
                <div className={styles.time_Slider}>
                    <TimeSlider SliderChange={SliderChange} />
                </div>)
            }
        </Fragment>
    );
};
export default Houchen