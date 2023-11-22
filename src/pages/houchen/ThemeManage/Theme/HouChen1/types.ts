// 菜单
export type menuType = {
    name: string;
    id: number
}

// 交通方式
export type JiaotongfangshiType = {
    value: number;
    name: string;
    img: string;
    id: number;
}

// 精选海报
export type jingxuanhaibaoType = {
    name: string;
    img: string;
    height: number;
    weight: number;
    capital: number
}

// 左上方菜单
export type footFallType = {
    name: string;  // 名称
    id: number;  // id
    delivery: number;  // 值
    unit: string;  // 单位
    flag: boolean;
}

// 年龄比例
export type shourushuipingType = {
    name: string;  // 名称
    id: number;  // id
    num: number;  // 数量
    money: number;  // 金额
};

// 年龄比例
export type nianlingbiliType = {
    name: string;  // 名称
    id: number;  // id
    num: number;  // 值
};