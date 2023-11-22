type DataItem = {
    [key: string]: string | number;
};

// 数组找到最大值
export function findMaxNum(dataArr: DataItem[], key: string = 'num'): number {
    if (dataArr.length === 0) {
        throw new Error('数组为空，无法找到最大值。');
    }

    return dataArr.reduce((max, item) => Math.max(max, item[key] as number), dataArr[0][key] as number);
}

// 数组平均值
export function calculateAverage(dataArr: DataItem[]): number {
    if (dataArr.length === 0) {
        throw new Error('数组为空，无法计算平均值。');
    }

    const sum = dataArr.reduce((total, item) => total + (typeof item.num === 'number' ? item.num : 0), 0);
    return sum / dataArr.length;
}

// 数组排序
export function sortDataArr(dataArr: DataItem[]): DataItem[] {
    return dataArr.sort((a, b) => (typeof a.num === 'number' && typeof b.num === 'number') ? a.num - b.num : 0);
}

// 算出占比并排序
export interface ExtendedDataItem extends DataItem {
    percentage: number;
}
export function calculatePercentage(dataArr: DataItem[], key: string = 'num'): ExtendedDataItem[] {
    const totalNum = dataArr.reduce((sum, item) => sum + Number(item[key]), 0);

    const sortedDataArr: ExtendedDataItem[] = dataArr.map(item => ({
        ...(item as DataItem),
        percentage: (Number(item[key]) as number / totalNum) * 100,
    })).sort((a, b) => b.percentage - a.percentage);
    return sortedDataArr;
}

// 这个方法是四舍五入的，跟原生的是不一样的
export function toFixed(n: number, fixed: number): number {
    return Math.floor(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
}

// 算出占比
export function proportion(dataArr: DataItem[], key: string = 'num'): ExtendedDataItem[] {
    const totalNum = dataArr.reduce((sum, item) => sum + Number(item[key]), 0);

    const sortedDataArr: ExtendedDataItem[] = dataArr.map(item => ({
        ...(item as DataItem),
        percentage: (Number(item[key]) as number / totalNum) * 100,
    }))
    return sortedDataArr
}

// 拆分数组
export const split_array = <T>(arr: T[], length: number): T[][] => {
    const a_length = arr.length;
    const result: T[][] = [];
    for (let i = 0; i < a_length; i += length) {
        result.push(arr.slice(i, i + length));
    }
    return result;
};

// 随机数
export const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};