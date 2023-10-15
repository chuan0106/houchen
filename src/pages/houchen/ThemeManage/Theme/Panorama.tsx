import { FC, useState, useEffect } from 'react';
import styles from './style.less'
import { connect } from 'dva';
import CountUp, { CountUpProps } from 'react-countup';

import city from '@/assets/houchen/icon/icon/xiancheng.png'
import populations from '@/assets/houchen/icon/icon/chengshirenkou@2x.png'
import economic from '@/assets/houchen/icon/icon/shehuizhili@2x.png'
import dimension from '@/assets/houchen/icon/icon/jiaotongchuxing@2x.png'
import yiliao from '@/assets/houchen/icon/icon/yiliaoweisheng@2x.png'
const toFixed = (n: number, fixed: number): number => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
// 定义男性人口数量（单位：万人）
const malePopulation = 4995;

// 定义女性人口数量（单位：万人）
const femalePopulation = 4917;

// 计算总人口数量
const totalPopulation = malePopulation + femalePopulation;

// 定义GDP（单位：亿元）
const gdp = 6.13 * 10000; // 将6.13万亿元转换为亿元

// 计算人均消费
const perCapitaConsumption = gdp * 10000 / totalPopulation; // 乘以10000是为了将单位从亿元转换为元

// 定义男性人口数量（单位：万人）
const zhoukou_malePopulation = 445;
const zhoukou_femalePopulation = 457;
const zhoukou_totalPopulation = zhoukou_malePopulation + zhoukou_femalePopulation;
const zhoukou_gdp = 3617; // 亿元
const zhoukou_perCapitaConsumption = zhoukou_gdp * 10000 / zhoukou_totalPopulation; // 元

// 鹿邑县
const luyi_malePopulation = 46.62;
const luyi_femalePopulation = 49.23;
const luyi_totalPopulation = luyi_malePopulation + luyi_femalePopulation;
const luyi_gdp = 490.01; // 亿元
const luyi_perCapitaConsumption = luyi_gdp * 10000 / luyi_totalPopulation; // 元


const henansheng_details = ` 河南省，位于中国中部，是中国的一个省级行政区划。以下是关于河南省的简要介绍：

位置：河南省位于中国中部，东临山东省，南接湖北省和湖南省，西界陕西省，北邻河北省和山西省。它的地理位置使其成为中国的中部重要省份。

部署：河南省下辖 17 个地级行政单位，包括郑州市（省会）、洛阳市、开封市、南阳市、新乡市等。郑州市是河南省的政治、经济和文化中心。

历史：河南是中国历史上重要的地区之一，拥有丰富的历史遗产。它是中国古代八大文化中心之一，拥有众多古代遗迹和文化遗产，如龙门石窟、白马寺、中原禅寺等。

经济：河南省在中国的经济中具有重要地位，主要产业包括农业、工业和服务业。河南是中国的小麦、棉花和豆类等农产品的主要产区。此外，河南还是重要的能源和重工业生产基地。

文化：河南省是中国文化的发源地之一，拥有丰富的传统文化。它是中国武术和太极拳的发源地之一，也以豫剧、豫剧等传统戏曲而闻名。

旅游：河南省有许多著名的旅游景点，如龙门石窟、少林寺、白马寺、颍川、云台山等。这些景点吸引着成千上万的游客前来参观。

总之，河南省作为中国中部的一个重要省份，拥有丰富的历史、文化和经济资源，对中国的发展和文化传承具有重要意义。`
const zhoukoushi_details = `
周口市，古称陈州 [38] 、龙都，河南省辖地级市，位于河南省东南部，地处黄淮平原腹地，东临安徽阜阳市，亳州市，西接漯河市、许昌市，南与驻马店市相连，北和开封市、商丘市接壤。1949年设淮阳专区，1965年淮阳专区改称周口专区（1969年改为周口地区）；2000年，经国务院批准撤销周口地区设立周口市。截至2020年6月，周口市共辖2个区，7个县，代管1个县级市，总面积11959平方千米 [30] ；截至2022年末，周口市常住人口为881.20万人。 [42] [59]
周口市交通四通八达，形成了公路、铁路、水路三位一体的大交通格局，有中原港城之誉，为中国36个主要内河港口之一。 [46] 。 [45] 沙颍河自古以来就是通航河道，建成有周口、刘湾两大货运码头，入淮河、汇长江，航运可直达南京、上海、杭州。周口是伏羲故都，老子故里，有“华夏先驱、九州圣迹”的美誉，被中华全国伏羲文化研究会誉为“中华文化发祥的重地”。`
const luyixian_detalis = `鹿邑县，古称苦县、鸣鹿，隶属于河南省周口市，为河南省省直管县 [31] ，位于周口市东北部，介于北纬33°43'3”至34°5'32"，东经115°2'55"至115°37'50"之间，属温带季风气候，地处黄淮平原涡河中游，豫皖两省交界处，是连接中原经济区和皖江经济带、长三角的枢纽城市 [9] ，总面积1238平方千米。 [1] [10] 根据第七次人口普查数据，截至2020年11月1日零时，鹿邑县共有常住人口958617人。 [11]
鹿邑地域原属豫州厉国，春秋战国时期始置苦县；1968年6月，鹿邑县属周口地区；2000年6月，鹿邑县改属周口市。 [13] 截至2020年6月，鹿邑县共辖4个街道、13个镇、7个乡。 [1] [12] 鹿邑是中国道家学派创始人老子的出生地， [30] 中国道教的发祥地之一； [14-17]拥有“老子故里、道家之源、道教祖庭、李姓之根”等文化。 [29] 2011年11月，鹿邑县被中国文联审批、中宣部备案为“中国老子文化之乡”。 [30] 2012年02月28日，鹿邑县入选“全国双拥模范城市”名单。 [3] 2017年11月1日，鹿邑县被住房和城乡建设部批准为国家园林城市。`

interface AnimatedCounterProps {
    number: number;
    unit: string;
}


type NumberAndUnit = {
    number: number;
    unit: string;
};

function splitNumberAndUnit(str: string): NumberAndUnit {
    const regex = /^(\d+(\.\d+)?)\s*(\S+)$/; // 匹配数字和单位的正则表达式
    const match = str.match(regex);

    // 使用非空断言运算符确保 match 不为 null
    const number = match![1] ? parseFloat(match![1]) : 0; // 解析为浮点数，或者默认为 0
    const unit = match ? match[3] : "";   // 匹配到的单位部分

    return { number, unit };
}

// 示例用法
const data = [
    { key: '省面积', value: '16.7 万平方米', id: 1 },
    { key: '占全国', value: '1.3 %', id: 2 },
];

data.forEach(item => {
    const result = splitNumberAndUnit(item.value);
    if (result) {
        const { number, unit } = result;
        console.log(`类型: ${item.key}, 数字: ${number}, 单位: ${unit}`);
    } else {
        console.log(`无法解析的数据: ${item.value}`);
    }
});


type Props = ReturnType<typeof mapStateToProps> & {
    dispatch: any;
}

const henansheng_obj = {
    name: '河南省', details: henansheng_details, cards: [
        {
            name: '城市', key1: '地级市', key2: '省级市', value1: 17, value2: 21, english: 'city', img: city, id: 1,
            menu: [
                { key: '地级市', value: 17 + '个', id: 1 },
                { key: '省级市', value: 21 + '个', id: 2 },
            ]
        },
        {
            name: '人口', key1: '男性', english: 'populations', img: populations, id: 2,
            menu: [
                { key: '男性', value: malePopulation + '万人', id: 1 },
                { key: '女性', value: femalePopulation + '万人', id: 2 },
            ]
        },
        {
            name: '经济', english: 'economic', img: economic, id: 3,
            menu: [
                { key: 'GDP', value: 6.13 + '万亿元', id: 1 },
                { key: '人均', value: toFixed(perCapitaConsumption, 2) + '元', id: 2 },
            ]
        },
        {
            name: '面积', english: 'dimension', img: dimension, id: 4,
            menu: [
                { key: '省面积', value: 16.7 + '万平方米', id: 1 },
                { key: '占全国', value: 1.3 + '%', id: 2 },
            ]
        },
        {
            name: '医疗', key1: '公立医院', key2: '民营医院', value1: 731, value2: 1736, english: 'medical treatment', img: yiliao, id: 5,
            menu: [
                { key: '公立医院', value: 731 + '所', id: 1 },
                { key: '民营医院', value: 1736 + '所', id: 2 },
            ]
        },
    ],
    id: 1
}
const zhoukoushi_obj = {
    name: '周口市', details: zhoukoushi_details, cards: [
        {
            name: '城市', english: 'city', img: city, id: 1,
            menu: [
                { key: '县城', value: 17 + '个', id: 1 },
                { key: '县级市', value: 1 + '个', id: 2 },
                { key: '市辖区', value: 2 + '个', id: 3 },
            ]
        },
        {
            name: '人口', english: 'populations', img: populations, id: 2,
            menu: [
                { key: '男性', value: 4454317 + '人', id: 1 },
                { key: '女性', value: 4571698 + '人', id: 2 },
            ]
        },
        {
            name: '经济', key1: 'GDP', key2: '人均', value1: '6.13万亿元', value2: toFixed(zhoukou_perCapitaConsumption, 2) + '元', english: 'economic', img: economic, id: 3,
            menu: [
                { key: 'GDP', value: zhoukou_gdp + '亿元', id: 1 },
                { key: '人均', value: toFixed(zhoukou_perCapitaConsumption, 2) + '元', id: 2 },
            ]
        },
        {
            name: '面积', english: 'dimension', img: dimension, id: 4,
            menu: [
                { key: '市面积', value: 11961 + 'km²', id: 1 },
                { key: '占河南省', value: 7 + '%', id: 2 },
            ]
        },
        {
            name: '医疗', english: 'medical treatment', img: yiliao, id: 5,
            menu: [
                { key: '医院', value: 205 + '个', id: 1 },
            ]
        },
    ],
    id: 2
}
const luyixian = {
    name: '鹿邑县', details: luyixian_detalis, cards: [
        {
            name: '下辖地区', english: 'city', img: city, id: 1,
            menu: [
                { key: '街道', value: 4 + '个', id: 1 },
                { key: '镇', value: 13 + '个', id: 2 },
                { key: '乡', value: 7 + '个', id: 3 },
            ]
        },
        {
            name: '人口', english: 'populations', img: populations, id: 2,
            menu: [
                { key: '男性', value: 466254 + '人', id: 1 },
                { key: '女性', value: 492363 + '人', id: 2 },
            ]
        },
        {
            name: '经济', key1: 'GDP', key2: '人均', value1: '6.13万亿元', value2: toFixed(zhoukou_perCapitaConsumption, 2) + '元', english: 'economic', img: economic, id: 3,
            menu: [
                { key: 'GDP', value: luyi_gdp + '亿元', id: 1 },
                { key: '人均', value: toFixed(luyi_perCapitaConsumption, 2) + '元', id: 2 },
            ]
        },
        {
            name: '面积', english: 'dimension', img: dimension, id: 4,
            menu: [
                { key: '市面积', value: 1238 + 'km²', id: 1 },
                { key: '占周口市', value: 10.36 + '%', id: 2 },
            ]
        },
        {
            name: '医疗', english: 'medical treatment', img: yiliao, id: 5,
            menu: [
                { key: '医院', value: 12 + '个', id: 1 },
            ]
        },
    ],
    id: 3
}
const dataContainer = [henansheng_obj, zhoukoushi_obj, luyixian]


const Panorama: FC<Props> = ({ mapCity, dispatch }) => {
    const [data, setData] = useState(dataContainer[0])
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const result = dataContainer.find(item => item.name === mapCity)
        result && setData(result)
    }, [mapCity])

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationKey((prevKey) => prevKey + 1);
        }, 8000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    const backHandler = () => {
        const cityMap: { [key: string]: string } = {
            '鹿邑县': '周口市',
            '周口市': '河南省',
        };
        if (cityMap[mapCity]) {
            dispatch({
                type: 'houchenModel/setMapCity',
                payload: cityMap[mapCity]
            });
        }
    }
    return (
        <div className={styles.panorama_theme}>
            <div className={styles.card_container}>
                <div className={styles.card} >
                    <p className={styles.card_title}>{data.name}</p>
                    <p className={styles.small_desc} >
                        {data.details}
                    </p>
                    {
                        data.name !== '河南省' && (
                            <div onClick={backHandler} className={styles.go_corner} >
                                <div className={styles.go_arrow}>←</div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles.theme_box}>
                {data.cards.map((item, i) => (
                    <div key={i} className={styles.card} >
                        <div className={styles.infos} >
                            <div className={styles.image} ><img src={item.img} alt="" /></div>
                            <div className={styles.info} >
                                <div>
                                    <p className={styles.name} >
                                        {item.name}
                                    </p>
                                    <p className={styles.function} >
                                        {item.english}
                                    </p>
                                </div>
                                <div className={styles.stats} >
                                    {item.menu?.map((d, k) => {
                                        const { number, unit } = splitNumberAndUnit(d.value);
                                        const decimalPlaces = number.toString().split('.')[1]?.length || 0; // 计算实际小数位数
                                        const countUpProps: CountUpProps = {
                                            start: 0,
                                            end: number,
                                            decimals: decimalPlaces,
                                            duration: 2.75,
                                            delay: 0,
                                            suffix: unit,
                                            separator: ","
                                        };
                                        return (
                                            <p key={k} className={`${styles.flex} ${styles.flex_col}`} >
                                                {d.key}
                                                {/* <span className={styles.state_value} >
 </span> */}
                                                <CountUp
                                                    key={animationKey}
                                                    {...countUpProps}
                                                >
                                                    {({ countUpRef, reset, start }) => (
                                                        <span className={styles.state_value} ref={countUpRef}></span>
                                                    )}
                                                </CountUp>
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

const mapStateToProps = ({ houchenModel }: { houchenModel: { mapCity: string } }) => {
    return {
        mapCity: houchenModel.mapCity
    }
}
export default connect(mapStateToProps)(Panorama);
