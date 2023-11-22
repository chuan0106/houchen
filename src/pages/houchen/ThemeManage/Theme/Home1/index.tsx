import { FC, useState, useEffect, Fragment, memo, } from 'react';
import styles from './style.less'
import { MarkerProperties } from '@/interface/houchen/map'
import CountUp, { CountUpProps } from 'react-countup';
import { connect } from 'dva';
import { UserOutlined } from '@ant-design/icons';
import * as echarts from 'echarts/core';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, LegendComponent, TooltipComponent]);
import { dispatchType } from '@/interface/houchen/map'
import { homeData, houchenData } from '@/pages/data/map'
// import Menu from '../Menu'

import Table from '@/pages/Components/Table'
import cunneijingji from '@/assets/houchen/icon/jingji.png'
import cunneirenshu from '@/assets/houchen/icon/renshu.png'
import hexinrenyuan from '@/assets/houchen/icon/hexinrenyuan.png'
import lebao from '@/assets/person/lebao.jpg'

import huangguan from '@/assets/icon/common/huangguan.png'
import yinguan from '@/assets/icon/common/yinguan.png'
import tongguan from '@/assets/icon/common/tongguan.png'

// import mapData from '../../data/home.json'



const contentStyle = {
    overflow: 'hidden', textOverflow: 'ellipsis'
};

const toFixed = (n: any, fixed: any) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
const random = (min: any, max: any) => Math.floor(Math.random() * (max - min + 1) + min);

const quanjugailan = [
    {
        name: '村内经济',
        id: 1,
        num: 213,
        unit: '万',
        img: cunneijingji
    },
    {
        name: '村内人数',
        id: 2,
        num: 178,
        unit: '人',
        img: cunneirenshu
    },
    {
        name: '核心人员',
        id: 3,
        num: 21,
        unit: '人',
        img: hexinrenyuan
    },
]
const jingjiqushi = [
    {
        type: 'line',
        name: '后陈',
        data: [1324, 1642, 1339, 1096],
        areaStyle: {},
        emphasis: {
            focus: 'series'
        },
    },
    {
        type: 'line',
        name: '赵村',
        data: [2013, 1936, 2130, 1372],
        areaStyle: {},
        emphasis: {
            focus: 'series'
        },
    },
    {
        type: 'line',
        name: '鹿邑',
        data: [2130, 2631, 2150, 2013],
        areaStyle: {},
        emphasis: {
            focus: 'series'
        },
    }
]
const zhudaochanye = [
    {
        name: '孙浩酒店',
        output_value: random(8000, 9000),
        yoy: 2,
        percentage_of_gold_coins: 3,

    },
    {
        name: '老威烤串',
        output_value: random(6000, 7000),
        yoy: 2,
        percentage_of_gold_coins: 3,
    },
    {
        name: '少主奶茶',
        output_value: random(7000, 9000),
        yoy: 2,
        percentage_of_gold_coins: 3,
    }
]



type DataSourceItemType = {
    match: string;
    name: string;
    age: string;
    sex: string;
    gold: number;
    property: string;
    hobbies: string;
    image?: string;
}

const dataSource: DataSourceItemType[] = [
    {
        match: '臧汗青',
        name: '羽神',
        age: '37',
        sex: '男',
        gold: -13648,
        property: '一辆电动车 一台小米手机',
        hobbies: '玩只狼'
    },
    {
        match: '胡乐乐',
        name: '胡乐乐',
        image: lebao,
        age: '28',
        sex: '男',
        gold: 376100,
        property: '一辆车一栋房子，其余若干',
        hobbies: '玩只狼'
    },
    {
        match: '郭帅',
        name: '郭帅',
        age: '29',
        sex: '男',
        gold: 13215,
        property: '鹿邑房子一栋，江苏房子一栋。其余若干',
        hobbies: 'lol'
    },
    {
        match: '臧文龙',
        name: '少主',
        age: '25',
        sex: '男',
        gold: -12456,
        property: '京东白条 花呗 各种信用卡',
        hobbies: '吃饭睡觉打豆豆'
    },
    {
        match: '孙浩',
        name: '孙浩',
        age: '26',
        sex: '男',
        gold: 301568,
        property: '一家酒吧，一栋别墅。其余若干',
        hobbies: '当老板'
    },
    {
        match: '黄艳波',
        name: '黄艳波',
        age: '27',
        sex: '男',
        gold: 7618,
        property: '一辆新款轿车，222高端电脑',
        hobbies: '没有最爱 只222有更爱'
    },
];

const rankedData = [...dataSource].sort((a, b) => b.gold - a.gold).map((item, index) => ({ ...item, rank: index + 1 }));

interface ModalType {
    id: number;
    title: string;
    content: string;
    image?: File | null;
}

type Props = {
    map: any,
    dispatch: (action: dispatchType) => void;
    popupInfo: MarkerProperties;
}
const Index: FC<Props> = ({ map, dispatch, popupInfo }) => {

    const [time, setTime] = useState(new Date().getHours())
    const [modal, setModal] = useState<ModalType | null>(null)
    const [animationKey, setAnimationKey] = useState(0);

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
        const channel = new BroadcastChannel('modal')
        channel.onmessage = e => {
            const { data } = e
            setModal(data)
        }
        return () => {
            channel.close(); // 在组件卸载时关闭 channel
        };
    }, [])

    useEffect(() => {
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            animationDuration: 3000,
            // Your Echarts options configuration here
            color: ['#149eca', '#42b883', '#78cff5'],
            xAxis: {
                type: 'category',
                data: ['2020', '2021', '2022', '2023'],
                nameLocation: 'middle',
                axisTick: {
                    show: false,  //是否显示网状线 默认为true
                    alignWithLabel: true
                },
                axisLabel: {
                    color: '#fff', // 设置文本颜色
                    fontSize: 13, // 设置字体大小
                }
            },
            tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
                trigger: 'axis',
                backgroundColor: 'rgba(32, 33, 36,.7)',
                borderColor: 'rgba(32, 33, 36,0.20)',
                borderWidth: 1,
                textStyle: { // 文字提示样式
                    color: '#fff',
                    fontSize: '12'
                },
            },
            series: jingjiqushi,
            legend: {
                show: true, // 显示图例
                top: 'top', // 控制图例的位置
                orient: 'horizontal', // 设置图例的排列方式，可以是水平（'horizontal'）或垂直（'vertical'）
                data: jingjiqushi.map(function (project) {
                    return {
                        name: project.name,
                        icon: 'pin', // 使用自定义的图例标记，这里使用了圆形
                        textStyle: {
                            color: 'var(--text-1)' // 设置图例文本的颜色
                        }
                    };
                })
            },
            yAxis: {
                type: 'value',
                name: '个',
                minInterval: 1,
                axisLine: { // 坐标轴刻度相关设置。
                    // show: true,
                    alignWithLabel: true,// 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
                    interval: 'auto', // 坐标轴刻度的显示间隔，在类目轴中有效。默认同 axisLabel.interval 一样。
                    inside: false, // 坐标轴刻度是否朝内，默认朝外。
                    length: 5, // 坐标轴刻度的长度。
                    lineStyle: { // 刻度线的样式设置。
                        color: "#eee", // 刻度线的颜色，默认取 axisTick.lineStyle.color。
                        width: 1,
                        type: 'dotted', // (实线：'solid'，虚线：'dashed'，星罗棋布的：'dotted')
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        opacity: 1,
                    },

                },
                splitLine: {
                    show: true, // 显示X轴网格线
                    lineStyle: {
                        color: '#ccc', // 修改x轴线条的颜色
                        width: 1, // 修改x轴线条的宽度
                        type: 'dotted' // 修改x轴线条的类型
                    }
                }

            },
            grid: {
                top: 35,
                left: 45,
                bottom: 20,
                right: 0,

            },

        };


        option && myChart.setOption(option);
    }, [])

    const columns = [
        {
            title: '排名',
            dataIndex: 'rank',
            key: 'rank',
            render: (text: any) => <div title={text} className={styles.ranking} style={contentStyle}>
                {text == 1 || text == 2 || text == 3 ? (<img src={text == 1 ? huangguan : text == 2 ? yinguan : text == 3 ? tongguan : null} />) : text}
            </div>
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <div title={text} style={{ whiteSpace: 'nowrap', ...contentStyle }}>{text}</div>,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            render: (text: any) => <div title={text} style={{ whiteSpace: 'nowrap', ...contentStyle }}>{text}</div>,
        },
        {
            title: '金币',
            dataIndex: 'gold',
            key: 'gold',
            render: (text: any) => <div title={text} style={{ whiteSpace: 'nowrap', ...contentStyle }}>{text}元</div>,
        },
        {
            title: '资产',
            dataIndex: 'property',
            key: 'property',
            render: (text: any) => <div title={text} style={{ whiteSpace: 'nowrap', ...contentStyle }}>{text}</div>,
        },
        {
            title: '操作',
            render: (_: any, record: DataSourceItemType) => (
                <a className={styles.operation} onClick={() => { examine(_, record) }}>查看详情</a>
            ),
        }
    ];
    const examine = (_: any, record: DataSourceItemType) => {


        // const newRecord = mapData.find(name => name.match === record.match)
        const newRecord = [...homeData.features, ...houchenData.features].find(name => name.properties.match === record.match)

        // 飞行指定地点
        if (map && newRecord) {
            // const { longitude, latitude, zoom } = newRecord
            const { geometry: { coordinates: center } } = newRecord

            console.log({ ...newRecord }, 'newRecord');

            map.flyTo({ center, zoom: 15, duration: 1000 });
            const setPopupInfoAction: dispatchType = {
                type: 'houchenModel/setPopupInfo',
                payload: { ...record, ...newRecord.properties }
            };
            dispatch(setPopupInfoAction)
        }
    }

    return (
        <>
            {/* <Menu /> */}
            <div className={styles.theme}>
                <div className={styles.container}>
                    <div className={styles.core}>
                        <div className={styles.theme_box}>
                            <div className={styles.head}>
                                <div className={styles.head_text}>
                                    全局概览
                                </div>
                                <div className={styles.head_loader}>
                                    <span className={`${styles.side} ${styles.side1}`} ></span>
                                    <span className={`${styles.side} ${styles.side2}`} ></span>
                                    <span className={`${styles.side} ${styles.side3}`} ></span>
                                    <span className={`${styles.side} ${styles.side4}`} ></span>
                                </div>
                            </div>
                            <div className={styles.content}>
                                {quanjugailan.map((item, i) => (
                                    <div key={`${item.name}${i}`} className={styles.box}>
                                        <img src={item.img} alt="" />
                                        <div className={styles.text}>
                                            <div>{item.name}</div>
                                            <div>{item.num}{item.unit}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.theme_box}>
                            <div className={styles.head}>
                                <div className={styles.head_text}>
                                    经济趋势
                                </div>
                                <div className={styles.head_loader}>
                                    <span className={`${styles.side} ${styles.side1}`} ></span>
                                    <span className={`${styles.side} ${styles.side2}`} ></span>
                                    <span className={`${styles.side} ${styles.side3}`} ></span>
                                    <span className={`${styles.side} ${styles.side4}`} ></span>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <div style={{ width: '100%', height: '200px' }} id='main'></div>
                            </div>
                        </div>

                        <div className={styles.theme_box}>
                            <div className={styles.head}>
                                <div className={styles.head_text}>
                                    三大主导产业
                                </div>
                                <div className={styles.head_loader}>
                                    <span className={`${styles.side} ${styles.side1}`} ></span>
                                    <span className={`${styles.side} ${styles.side2}`} ></span>
                                    <span className={`${styles.side} ${styles.side3}`} ></span>
                                    <span className={`${styles.side} ${styles.side4}`} ></span>
                                </div>
                            </div>
                            <div className={styles.leading_industry}>
                                {zhudaochanye.map((industry, i) => {
                                    // 计算总值
                                    const totalOutputValue = zhudaochanye.reduce((sum, item) => sum + item.output_value, 0);
                                    return (
                                        <Fragment key={i}>
                                            <div className={styles.box}>
                                                <div className={styles.title}>{i + 1}.{industry.name}</div>
                                                <div className={styles.production}>
                                                    <div className={styles.value}>
                                                        <span className={styles.num}>{industry.output_value}</span>
                                                        <span className={styles.unit}>元</span>
                                                    </div>
                                                    <div className={styles.type} style={{ color: 'rgb(184, 233, 134)' }}>产值</div>
                                                </div>
                                                <div className={styles.production}>
                                                    <div className={styles.value}>
                                                        <span className={styles.num}>{industry.yoy}</span>
                                                        <span className={styles.unit}>%</span>
                                                    </div>
                                                    <div className={styles.type} style={{ color: 'rgb(255, 246, 135)' }}>同比</div>
                                                </div>
                                                <div className={styles.production}>
                                                    <div className={styles.value}>
                                                        <span className={styles.num}>{toFixed(industry.output_value / totalOutputValue * 100, 2)}</span>
                                                        <span className={styles.unit}>%</span>
                                                    </div>
                                                    <div className={styles.type} style={{ color: 'rgb(221, 162, 126)' }}>金币占比</div>
                                                </div>
                                            </div>

                                        </Fragment>

                                    )
                                })
                                }
                            </div>
                        </div>
                        {/* 土豪排行榜 */}
                        <div className={styles.theme_box}>
                            <div className={styles.head}>
                                <div className={styles.head_text}>
                                    土豪排行榜
                                </div>
                                <div className={styles.head_loader}>
                                    <span className={`${styles.side} ${styles.side1}`} ></span>
                                    <span className={`${styles.side} ${styles.side2}`} ></span>
                                    <span className={`${styles.side} ${styles.side3}`} ></span>
                                    <span className={`${styles.side} ${styles.side4}`} ></span>
                                </div>
                            </div>
                            <div className={styles.table}>
                                <div style={{ height: '180px' }}>
                                    <Table dataSource={rankedData} columns={columns} isScroll={true} rowClassName={{ oddStyle: { color: '#fff', background: 'rgba(16, 48, 102,.3)', fontSize: '14px' }, evenStyle: { color: '#FFF2D6', background: 'rgba(255, 242, 214, .3)', fontSize: '14px' } }} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* <div className={styles.container_right}>
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
                </div> */}
                <div className={styles.modal}>
                    <div style={{ display: modal ? 'block' : 'none' }} className={styles.cookie_card} >
                        <span className={styles.title} >{modal?.title}</span>
                        <p className={styles.description} >{modal?.content} <a href="#">详细了解...</a>. </p>

                        <div className={styles.actions} >
                            <button style={{ visibility: 'hidden' }} className={styles.pref} >
                                Manage your preferences
                            </button>
                            <button onClick={() => { setModal(null) }} className={styles.accept} >
                                关闭
                            </button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};

function mapStateToProps({ houchenModel }: any) {
    return {
        map: houchenModel.map,
        popupInfo: houchenModel.popupInfo
    }
}
export default connect(mapStateToProps)(memo(Index));

