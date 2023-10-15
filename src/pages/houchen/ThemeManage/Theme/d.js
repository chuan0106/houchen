
function splitNumberAndUnit (str)
{
    const regex = /^(\d+(\.\d+)?)\s*(\S+)$/; // 匹配数字和单位的正则表达式
    const match = str.match(regex);

    if (match)
    {
        const number = match[1]; // 匹配到的数字部分
        const unit = match[3];   // 匹配到的单位部分
        return { number, unit };
    } else
    {
        return null; // 如果没有匹配到数字和单位，返回 null
    }
}

// 示例用法
const data = [
    { key: '省面积', value: '16.7 万平方米', id: 1 },
    { key: '占全国', value: '1.3 %', id: 2 },
];

data.forEach(item =>
{
    const result = splitNumberAndUnit(item.value);
    if (result)
    {
        const { number, unit } = result;
        console.log(`类型: ${item.key}, 数字: ${number}, 单位: ${unit}`);
    } else
    {
        console.log(`无法解析的数据: ${item.value}`);
    }
});