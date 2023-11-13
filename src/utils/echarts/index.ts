import * as echarts from 'echarts';
export const lineCharts = (dom, data, color, chartHandler, chart) => {
    var chartDom = dom
    var myChart = echarts.init(chartDom, null, { passive: true });
    var option;
    chartHandler(myChart)

    function run(_rawData) {
        const countries = [
            'React',
            'Vue',
            'Jquery'
        ];

        const datasetWithFilters = [];
        const seriesList = [];
        echarts.util.each(countries, function (project) {
            var datasetId = 'dataset_' + project;
            datasetWithFilters.push({
                id: datasetId,
                fromDatasetId: 'dataset_raw',

                transform: {
                    type: 'filter',
                    config: {
                        and: [
                            { dimension: 'ProjectName', '=': project }
                        ]
                    }
                }
            });

            seriesList.push({
                type: 'line',
                datasetId: datasetId,
                showSymbol: false,
                name: project,
                labelLayout: {
                    moveOverlap: 'shiftY'
                },
                emphasis: {
                    focus: 'series'
                },
                encode: {
                    x: 'Year',
                    y: 'quantity',
                    label: ['ProjectName', 'quantity'],
                    itemName: 'Year',
                    tooltip: ['quantity']
                },
                lineStyle: {
                    type: 'solid' // 将折线设置为虚线
                }
            });

        });

        option = {
            animationDuration: 3000,
            color: ['#149eca', '#42b883', '#78cff5'],
            legend: {
                show: true, // 显示图例
                top: 'top', // 控制图例的位置
                orient: 'horizontal', // 设置图例的排列方式，可以是水平（'horizontal'）或垂直（'vertical'）
                // 根据项目名称数组生成自定义的图例项
                data: countries.map(function (project) {
                    return {
                        name: project,
                        icon: 'pin', // 使用自定义的图例标记，这里使用了圆形
                        textStyle: {
                            color: 'var(--text-1)' // 设置图例文本的颜色
                        }
                    };
                })
            },
            // 其他配置项...
            dataset: [
                {
                    id: 'dataset_raw',
                    source: _rawData
                },
                ...datasetWithFilters
            ],
            // title: {
            //     text: 'Income of Germany and France since 1950'
            // },
            tooltip: {
                order: 'valueDesc',
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                nameLocation: 'middle',
                axisTick: {
                    show: false,  //是否显示网状线 默认为true
                    alignWithLabel: true
                },
                axisLabel: {
                    show: true,  //这里的show用于设置是否显示x轴下的字体 默认为true
                    interval: 0,  //可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推。
                    textStyle: {   //textStyle里面写x轴下的字体的样式
                        color,
                        fontSize: 13
                    }
                },
                // axisLine: {
                //     lineStyle: {
                //         color: '#ccc', // 修改x轴线条的颜色
                //         width: 1, // 修改x轴线条的宽度
                //         type: 'solid' // 修改x轴线条的类型
                //     }
                // },
                // splitLine: {
                //     show: true, // 显示X轴网格线
                //     lineStyle: {
                //         color: '#ccc', // 修改x轴线条的颜色
                //         width: 1, // 修改x轴线条的宽度
                //         type: 'solid' // 修改x轴线条的类型
                //     }
                // }
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
                top: 33,
                left: 25,
                bottom: 20,
                right: 0,

            },
            series: seriesList
        };
        myChart.setOption(option);

    }
    run(data)
}

export const FoldingLineChart = (data) => {
    let chartDom = document.querySelector(data);
    let myChart = echarts.init(chartDom);
    let yearData = [
        {
            year: '2020', // 年份
            data: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            ],
        },
        {
            year: '2021', // 年份
            data: [
                [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
                [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34],
            ],
        },
    ];
    myChart.setOption({
        // 通过这个color修改两条线的颜色
        color: ['#ed3f35', '#00f2f1'],
        tooltip: {
            trigger: 'axis',

        },
        grid: {
            // top: '20%',
            // left: '3%',
            // right: '4%',
            // bottom: '3%',
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '0%',
            show: true,
            borderColor: '#012f4a',
            containLabel: true,
        },

        xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
            ],
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: 'transparent',
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: 'transparent',
            },
            axisLine: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a',
                },
            },
        },
        series: [
            {
                type: 'line',
                // smooth: true,
                showSymbol: false,
                data: yearData[0].data[0],
            },
        ],
    });
};