import { FC, useState, useEffect } from 'react';
import styles from './style.less'
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

}
const Index: FC<Props> = () => {
    useEffect(() => {
        var chartDom = document.getElementById('pieChart')!;
        var myChart = echarts.init(chartDom);
        var option: EChartsOption;

        option = {
            tooltip: {
                trigger: 'item'
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
                        show: true,
                        position: 'center',
                        // formatter: function (params) {
                        //     var value = params.value;
                        //     var name = params.name;
                        //     return `{a|${name}}\n{b|${value}}`;
                        // },
                        rich: {
                            a: {
                                fontSize: 14,
                                lineHeight: 20,
                                color: '#333',
                                align: 'center'
                            },
                            b: {
                                fontSize: 18,
                                lineHeight: 20,
                                color: '#333',
                                align: 'center'
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#fff'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: '铁路' },
                        { value: 735, name: '自驾' },
                        { value: 580, name: '航空' },
                        { value: 484, name: '客运' },
                    ]
                }
            ]
        };

        var currentIndex = -1; // 当前高亮的数据索引
        var intervalId = setInterval(function () {
            var dataLength = option.series[0].data.length;

            // 取消上一个数据的高亮状态
            if (currentIndex !== -1) {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: currentIndex
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

        option && myChart.setOption(option);
    }, [])
    return (
        <div style={{ height: '100%' }} id='pieChart'>

        </div>
    );
};
export default Index