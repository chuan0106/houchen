import { FC, useState, useRef, useEffect, Fragment } from 'react'
import styles from './style.less'
import { Carousel } from 'antd';
import type { CarouselRef } from "antd/lib/carousel"
import CountUp, { CountUpProps } from 'react-countup';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import {
    UserOutlined,
} from '@ant-design/icons';
import WheelAndHamster from '@/components/WheelAndHamster'
import Progress from '@/components/Progress'
import PieChart from './PieChart'
// import MessageCard from '@/components/MessageCard'
import CardMenu from '../../../Components/CardMenu'
import MessageCard from '../../../Components/MessageCard'
import { proportion, calculatePercentage, toFixed } from '@/utils/js/tools'

import { jiaotongfangshiData } from './data'
import lebao from '@/assets/person/lebao.jpg'
import shaozhu from '@/assets/person/shaozhu.jpg'
import gao from '@/assets/person/gao.jpg'
import shuai from '@/assets/person/shuai.jpg'
import wei from '@/assets/person/wei.jpg'
import yushen from '@/assets/person/yushen.png'


const split_array = (arr, length) => {  // arr 是需要拆分的数组 length 是要拆分小数组的数量
    let a_length = arr.length
    let result = []  // 结果数组
    for (let i = 0; i < a_length; i += length) {
        result.push(arr.slice(i, i + length))  // 循环遍历原数组的 N 个元素 每次取从上次取的下一个开始取
    }
    return result  // 把结果数组 return 
}

const random = (min: any, max: any) => Math.floor(Math.random() * (max - min + 1) + min);

type EChartsOption = echarts.EChartsOption;


type DataItem = {
    [key: string]: string | number;
};

const dataArr: DataItem[] = [
    { name: '少年', num: 29, id: 1 },
    { name: '青年', num: 73, id: 2 },
    { name: '中年', num: 64, id: 3 },
    { name: '老年', num: 59, id: 4 },
];

const proportionSort = calculatePercentage(dataArr)

const columnData = [
    { name: '低', id: 1, num: 37, money: 269128 },
    { name: '一般', id: 2, num: 59, money: 731500 },
    { name: '中产', id: 3, num: 28, money: 679418 },
    { name: '小资', id: 4, num: 21, money: 816973 },
    { name: '富裕', id: 5, num: 8, money: 999999 },
]
const proportionData = proportion(columnData)


type dataImgsType = {
    name: string;
    img: string;
    height: number;
    weight: number;
    capital: number
}

const dataImgs: dataImgsType[] = [
    { name: '小高', img: gao, height: 175, weight: 180, capital: -13260 },
    { name: '乐宝', img: lebao, height: 172, weight: 140, capital: 39260 },
    { name: '少主', img: shaozhu, height: 178, weight: 125, capital: -3260 },
    { name: '郭帅', img: shuai, height: 177, weight: 160, capital: 23260 },
    { name: '老威', img: wei, height: 170, weight: 136, capital: 63260 },
    { name: '二弟', img: yushen, height: 177, weight: 147, capital: -13260 },
]


type Props = {

}

const Houchen: FC<Props> = () => {

    const [data, setData] = useState(proportionSort)
    const [messageObj, setMessageObj] = useState<null | dataImgsType>(null);
    const carouselRef = useRef<CarouselRef>(null)
    const [animationKey, setAnimationKey] = useState(0);
    const [time, setTime] = useState(new Date().getHours())

    const footfall = [
        { name: '今日客流量', id: 1, delivery: time * random(680, 820), unit: '人次' },
        { name: '开业累计客流量', id: 1, delivery: 682536, unit: '人次' },
        { name: '昨日客流量', id: 1, delivery: 24 * random(680, 820), unit: '人次' },
        { name: '平均停留时间', id: 1, delivery: random(145, 180), unit: '分钟' },
    ]
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationKey((prevKey) => prevKey + 1);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);
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

    const openDetails = (dataObj: dataImgsType) => {
        setMessageObj(dataObj)
    }

    const closeHandler = (flag: null) => {
        setMessageObj(flag)
    }
    const CarouselDOM = () => {
        let newData = split_array(dataImgs, 1)
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
                    <div className={`${styles.theme_box} ${styles.pie}`} >
                        <div className={styles.head}>
                            <div className={styles.head_text}>交通方式</div>
                            <WheelAndHamster size={'3px'} />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.jiaotongfangshi}>

                                <div className={`${styles.flex1} ${styles.box_left}`}>
                                    {jiaotongfangshiData.map(item => (
                                        <div key={item.id} className={styles.box_content}>
                                            <img src={item.img} alt="" />
                                            <div className={styles.value}>
                                                <span>{item.name}</span>
                                                <span>{item.value}辆</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={`${styles.flex1} ${styles.box_right}`}>
                                    <PieChart data={jiaotongfangshiData} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={`${styles.theme_box} ${styles.imgs}`} >
                        <div className={styles.head}>
                            <div className={styles.head_text}>精选海报</div>
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
                            <div className={styles.head_text}>收入水平</div>
                            <WheelAndHamster size={'3px'} />
                        </div>
                        <div className={styles.content}>
                            <div id='main' className={styles.column}>
                            </div>
                        </div>
                    </div>
                    <div className={styles.theme_box}>
                        <div className={styles.head}>
                            <div className={styles.head_text}>年龄比例</div>
                            <WheelAndHamster size={'3px'} />
                        </div>
                        <div className={styles.content}>
                            {data.map((item, index) => (
                                <div className={styles.box}>
                                    <div style={{
                                        backgroundPositionX: 0,
                                        // 循环精灵图
                                        backgroundPositionY: 0 - index * 70 + 'px'
                                    }} className={styles.img}></div>
                                    <div className={styles.text}>{item.name}</div>
                                    <div className={styles.progress} >
                                        <div style={{ width: '100%' }}>
                                            <Progress percent={toFixed(item.percentage, 0)} unSelectedColor={'#000'} strokeColor={{
                                                from: 'rgb(161, 29, 102)',
                                                to: 'rgb(83, 177, 36)',
                                            }}
                                                value={item.num}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    {/* <div className={`${styles.menu} `} >
                        <CardMenu />
                    </div> */}

                </div>

            </div>
            <div className={styles.container_right}>
                <div className={styles.core}>
                    {footfall.map(item => {
                        const countUpProps: CountUpProps = {
                            start: 0,
                            end: item.delivery,
                            decimals: 0,
                            duration: 1.25,
                            delay: 0,
                            separator: ","
                        };
                        return (
                            <div key={item.id} className={styles.item_box}>
                                <UserOutlined />

                                <div className={styles.content}>
                                    <p className={styles.title}>{item.name}</p>
                                    <CountUp
                                        key={animationKey}
                                        {...countUpProps}
                                    >
                                        {({ countUpRef }) => (
                                            <div className={styles.value}>
                                                <span className={`${styles.state_value} ${styles.unit}`} ref={countUpRef}></span>
                                                <span className={`${styles.state_value} ${styles.unit}`}>{item.unit}</span>
                                            </div>

                                        )}
                                    </CountUp>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            {messageObj && (
                <div className={styles.message}>
                    <MessageCard closeHandler={closeHandler} messageObj={messageObj} />
                </div>
            )}
        </Fragment>
    );
};
export default Houchen