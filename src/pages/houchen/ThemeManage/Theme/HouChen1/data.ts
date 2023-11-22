import type { menuType, JiaotongfangshiType, jingxuanhaibaoType, footFallType, shourushuipingType, nianlingbiliType } from './types'
import { random } from '@/utils/js/tools'

import tielu from '@/assets/houchen/icon/houchen/tielu.png'
import zijia from '@/assets/houchen/icon/houchen/zijia.png'
import hangkong from '@/assets/houchen/icon/houchen/hangkong.png'
import keyun from '@/assets/houchen/icon/houchen/keyun.png'

import lebao from '@/assets/person/lebao.jpg'
import shaozhu from '@/assets/person/shaozhu.jpg'
import gao from '@/assets/person/gao.jpg'
import shuai from '@/assets/person/shuai.jpg'
import wei from '@/assets/person/wei.jpg'
import yushen from '@/assets/person/yushen.png'

// 菜单
export const menu: menuType[] = [
    { name: '客流来源', id: 1 },
    { name: '景区实时客流', id: 2 },
]

// 左上1
export const footfall1: footFallType[] = [
    { name: '开业累计客流量', id: 1, delivery: random(76485, 81820), unit: '人次', flag: false },
    { name: '昨日客流量', id: 2, delivery: 24 * random(376, 620), unit: '人次', flag: false },
    { name: '平均停留时间', id: 3, delivery: random(145, 180), unit: '分钟', flag: false }
]

// 左上2
export const footfall2: footFallType[] = [
    { name: '今日客流量', id: 1, delivery: random(680, 820), unit: '人次', flag: true },
    { name: '昨日客流量', id: 2, delivery: random(376, 620), unit: '人次', flag: true },
    { name: '平均停留时间', id: 3, delivery: random(149, 179), unit: '分钟', flag: false },
]

// 标题
export const titles: string[] = ['交通方式', '精选海报', '收入水平', '年龄比例']

// 交通方式
export const jiaotongfangshiData: JiaotongfangshiType[] = [
    { value: random(32, 41), name: '铁路', img: tielu, id: 1 },
    { value: random(30, 37), name: '自驾', img: zijia, id: 1 },
    { value: random(27, 34), name: '航空', img: hangkong, id: 3 },
    { value: random(20, 33), name: '客运', img: keyun, id: 4 },
];

// 精选海报
export const jingxuanhaibaoData: jingxuanhaibaoType[] = [
    { name: '小高', img: gao, height: 175, weight: 180, capital: -13260 },
    { name: '乐宝', img: lebao, height: 172, weight: 140, capital: 39260 },
    { name: '少主', img: shaozhu, height: 178, weight: 125, capital: -3260 },
    { name: '郭帅', img: shuai, height: 177, weight: 160, capital: 23260 },
    { name: '老威', img: wei, height: 170, weight: 136, capital: 63260 },
    { name: '二弟', img: yushen, height: 177, weight: 147, capital: -13260 },
]

// 收入水平
export const shourushuipingData: shourushuipingType[] = [
    { name: '低', id: 1, num: 37, money: 269128 },
    { name: '一般', id: 2, num: 59, money: 731500 },
    { name: '中产', id: 3, num: 28, money: 679418 },
    { name: '小资', id: 4, num: 21, money: 816973 },
    { name: '富裕', id: 5, num: 8, money: 999999 },
]

// 年龄比例
export const nianlingbiliArr: nianlingbiliType[] = [
    { name: '少年', num: random(13, 19), id: 1 },
    { name: '青年', num: random(18, 32), id: 2 },
    { name: '中年', num: random(19, 39), id: 3 },
    { name: '老年', num: random(16, 27), id: 4 }
];

