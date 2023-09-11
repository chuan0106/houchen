import { FC, useState, useEffect, useRef, Fragment } from 'react';
import styles from './style.less'
import { connect } from 'dva';
import * as echarts from 'echarts/core';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, LegendComponent, TooltipComponent]);

import Table from '@/pages/Components/Table'
import cunneijingji from '@/assets/houchen/icon/jingji.png'
import cunneirenshu from '@/assets/houchen/icon/renshu.png'
import hexinrenyuan from '@/assets/houchen/icon/hexinrenyuan.png'
import mapData from '../../data/home.json'

const contentStyle = {
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
};

const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


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


const dataSource = [
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
        name: '阿黄',
        age: '27',
        sex: '男',
        gold: 7618,
        property: '一辆新款轿车，高端电脑',
        hobbies: '没有最爱 只有更爱'
    },
];

const rankedData = [...dataSource].sort((a, b) => b.gold - a.gold).map((item, index) => ({ ...item, rank: index + 1 }));


type Props = {
    map: object
}
const Index: FC<Props> = ({ map }) => {
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
            yAxis: {
                type: 'value'
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
                axisLine: {
                    lineStyle: {
                        color: '#ccc', // 修改x轴线条的颜色
                        width: 1, // 修改x轴线条的宽度
                        type: 'dotted' // 修改x轴线条的类型
                    }
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
            render: text => <div title={text} style={contentStyle}>{text}</div>,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: text => <div title={text} style={contentStyle}>{text}</div>,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            render: text => <div title={text} style={contentStyle}>{text}</div>,
        },
        {
            title: '金币',
            dataIndex: 'gold',
            key: 'gold',
            render: text => <div title={text} style={contentStyle}>{text}元</div>,
        },
        {
            title: '资产',
            dataIndex: 'property',
            key: 'property',
            render: text => <div title={text} style={contentStyle}>{text}</div>,
        },
        {
            title: '操作',
            render: (_, record) => (
                <a className={styles.operation} onClick={() => { examine(_, record) }}>查看详情</a>
            ),
        }
    ];
    const examine = (_, record) => {
        const newRecord = mapData.find(name => name.match === record.match)
        if (map && newRecord) {
            const { longitude, latitude, zoom } = newRecord
            map.flyTo({ center: [longitude, latitude], zoom, duration: 1000 });
        }
    }
    return (
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
                                    <Fragment>
                                        <div className={styles.box}>
                                            <div className={styles.title}>{i + 1}.{industry.name}</div>
                                            <div key={'zhudao' + 'k'} className={styles.production}>
                                                <div className={styles.value}>
                                                    <span className={styles.num}>{industry.output_value}</span>
                                                    <span className={styles.unit}>元</span>
                                                </div>
                                                <div className={styles.type} style={{ color: 'rgb(184, 233, 134)' }}>产值</div>
                                            </div>
                                            <div key={'zhudao' + 'k'} className={styles.production}>
                                                <div className={styles.value}>
                                                    <span className={styles.num}>{industry.yoy}</span>
                                                    <span className={styles.unit}>%</span>
                                                </div>
                                                <div className={styles.type} style={{ color: 'rgb(255, 246, 135)' }}>同比</div>
                                            </div>
                                            <div key={'zhudao' + 'k'} className={styles.production}>
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
                            {/* <div className={styles.leading_industry}>
                                <div className={styles.title}>有色金属</div>
                                <div className={styles.production}>
                                    <div className={styles.value}>
                                        <span className={styles.num}>271.96</span>
                                        <span className={styles.unit}>亿元</span>
                                    </div>
                                    <div style={{ textAlign: 'center', color: 'rgb(184, 233, 134)' }}>产值</div>
                                </div>
                                <div className={styles.production}>
                                    <div className={styles.value}>
                                        <span className={styles.num}>26.7</span>
                                        <span className={styles.unit}>%</span>
                                    </div>
                                    <div style={{ textAlign: 'center', color: 'rgb(255, 246, 135);' }}>同比</div>
                                </div>
                                <div className={styles.production}>
                                    <div className={styles.value}>
                                        <span className={styles.num}>26.4</span>
                                        <span className={styles.unit}>%</span>
                                    </div>
                                    <div style={{ textAlign: 'center', color: 'rgb(221, 162, 126)' }}>金币占比</div>
                                </div>
                            </div> */}
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
                                <Table dataSource={rankedData} columns={columns} isScroll={true} rowClassName={{ oddStyle: { color: '#fff', background: '#103066', fontSize: '14px' }, evenStyle: { color: '#FFF2D6', background: '#0D2954', fontSize: '14px' } }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

function mapStateToProps({ houchenModel }: any) {
    return {
        map: houchenModel.map
    }
}
export default connect(mapStateToProps)(Index);