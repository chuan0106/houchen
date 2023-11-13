import * as echarts from 'echarts';
export const FoldingLineChart = (data) =>
{
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