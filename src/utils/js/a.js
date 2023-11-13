
// 示例用法
const dataArr = [
    { name: '少年', num: 29, id: 1 },
    { name: '青年', num: 73, id: 2 },
    { name: '中年', num: 64, id: 3 },
    { name: '老年', num: 59, id: 4 },
];

const totalNum = dataArr.reduce((sum, item) => sum + item.num, 0);

const sortedDataArr = dataArr.map(item => ({
    ...item,
    percentage: (item.num / totalNum) * 100,
})).sort((a, b) => b.percentage - a.percentage);

console.log(sortedDataArr);