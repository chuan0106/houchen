import { FC, useEffect } from 'react';
import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    TooltipComponentOption,
    LegendComponent,
    LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { JiaotongfangshiType } from '../types';

echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
    TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;


type Props = {
    data: JiaotongfangshiType[];
    time: number;
}
const Index: FC<Props> = ({ data, time }) => {
    console.log({ time });

    useEffect(() => {
        var chartDom = document.getElementById('pieChart')!;
        var myChart = echarts.init(chartDom);
        var option: EChartsOption;

        option = {
            tooltip: {
                show: false,
                trigger: 'item',
                position: [15, '70%'], // 设置提示框位置为固定的坐标值
                // position: ['insideLeft'], 
            },
            legend: {
                show: false,
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['65%', '90%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                        formatter: function (params) {
                            var value = params.value;
                            var name = params.name;
                            var percent = params.percent.toFixed(2); // 保留两位小数的百分比值
                            return `${name}\n${percent}%`;
                        },
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#fff'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data.map(item => {
                        console.log(item.value * time, ' item.value * time');

                        return {
                            ...item,
                            value: item.value * time
                        }
                    })
                }
            ]
        };

        var currentIndex = -1; // 当前高亮的数据索引
        let intervalId: any = null // 定时器ID

        function highlightPie() {
            // 遍历饼图数据，取消所有图形的高亮效果
            // for (var idx in option.series[0].data.length) {
            //     myChart.dispatchAction({
            //         type: 'downplay',
            //         seriesIndex: 0,
            //         dataIndex: idx
            //     });
            // }
            // 高亮当前图形
            myChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: currentIndex,
            });
            console.log(currentIndex, 'params.dataIndex');

        }

        // 鼠标悬停时清除定时器
        // 鼠标悬停时取消自动高亮的文字展示
        myChart.on('mouseover', function (params) {
            clearInterval(intervalId);
            var dataLength = option.series[0].data.length;

            // 取消之前所有数据的高亮状态
            for (var i = 0; i < dataLength; i++) {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: i
                });
            }
            myChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: params.dataIndex,
            });
            // currentIndex = params.dataIndex;
            // highlightPie()
        });

        // 鼠标离开时重新启动定时器
        myChart.on('mouseout', function () {
            startHighlight();
        });

        // 启动自动高亮
        function startHighlight() {
            intervalId = setInterval(function () {
                var dataLength = option.series[0].data.length;

                // 取消之前所有数据的高亮状态
                for (var i = 0; i < dataLength; i++) {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: i
                    });
                }

                // 计算下一个数据的索引
                currentIndex = (currentIndex + 1) % dataLength;

                // 高亮下一个数据
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });

                // 显示当前高亮数据的值
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
            }, 2000); // 每隔2秒切换一次高亮状态
        }

        // 启动自动高亮
        startHighlight();

        option && myChart.setOption(option);
        return () => {
            clearInterval(intervalId)
        }
    }, [time])
    return (
        <div style={{ height: '100%', width: '100%' }} id='pieChart'> </div>
    );
};
export default Index