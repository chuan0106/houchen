const lengthToChinese = (arr: any[]): string => {
    const length = arr.length;
    const chineseNumbers: string[] = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const chineseDigits: string[] = ["", "十", "百"];

    if (length < 1 || length > 99) {
        return "超出范围";
    } else if (length < 10) {
        return chineseNumbers[length];
    } else {
        const tens = Math.floor(length / 10);
        const units = length % 10;
        const tensDigit = tens === 1 ? "" : chineseNumbers[tens];
        const unitsDigit = units === 0 ? "" : chineseNumbers[units];
        return tensDigit + chineseDigits[1] + unitsDigit;
    }
};



import { FC, useState, useRef, useEffect } from 'react';
import styles from './style.less'
import * as turf from '@turf/turf'
import { BS } from '@/utils/BetterScroll'
import { toFixed } from '@/utils/js/tools'
import Card from '@/components/Card'
import TimeSlider from '@/components/TimeSlider/index'

import { henansheng, zhoukoushi, homeData } from '@/pages/data/map'

import jqzl from '@/assets/ipad/hongjie/jqzl.png';
import jqhd from '@/assets/ipad/hongjie/jqhdx.png';
import jqkl from '@/assets/ipad/hongjie/jqkl.png';
import jqxf from '@/assets/ipad/hongjie/jqxf.png';
import wxz_bg from '@/assets/ipad/hongjie/wxz_bg.png';
import wdhc_img from '@/assets/ipad/hongjie/wdhc_img.png'
import icon from '@/assets/ipad/hongjie/icon.png';
import loginout from '@/assets/ipad/hongjie/loginout.png';
import tabSelect from '@/assets/ipad/hongjie/tabSelect.png';
import qckq from '@/assets/ipad/hongjie/qckq.png';
import dckq from '@/assets/ipad/hongjie/dckq.png';
import cnkl from '@/assets/ipad/hongjie/cnkl.png';
import znyj from '@/assets/ipad/hongjie/znyj.png';
import Item from 'antd/es/list/Item';
import keyun from '@/assets/houchen/icon/houchen/keyun.png';


export function screenRatio() {
    // alert(document.body.clientWidth / screenSize.width);
    return document.body.clientWidth / screenSize.width;
}

export const screenSize = {
    width: 2048,
    height: 1536,
};

const getArea = () => {
    const polygonData = {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [115.4029739, 33.87238],
                    [115.4039739, 33.8797],
                    [115.414, 33.8797],
                    [115.414, 33.87338],
                    [115.4029739, 33.87238]
                ]
            ]
        }
    };
    return turf.area(polygonData);
}
console.log(getArea());

const modalData = [
    { title: '鹿邑', content: '鹿邑县地方特产有宋河粮液、鹿邑大曲、鹿邑草帽、张店尾毛、观堂麻片、邱集烧饼、鹿邑卤鸡、 孔集烧鸡、试量狗肉、辛集麻花、鹿邑妈糊、娃娃鱼粉丝汤、高集烧饼等。', id: 1 },
    { title: '后陈胡同', content: `后陈胡同位于鹿邑县谷阳街道，此处有公园、农庄、集市等。后陈胡同可以观看农村风景，购买各式各样的农产品。总面积${toFixed(getArea(), 2)}平方米`, id: 2 },
    { title: '赵村乡', content: '赵村乡地处鹿邑县中部，东和谷阳街道毗邻，东南、南与生铁冢镇相接，西南、西与试量镇相依，西北与丘集乡接壤，北，东北邻穆店乡，距鹿邑县城12千米， [1] 区域总面积63.87平方千米。', id: 3 },
    { title: '罗庄', content: '不知道什么情况，但似乎发生过什么事情！', id: 4 },
    { title: '桃源县', content: '距离那么远，似乎有乐宝的身影...', id: 5 },
]

const DataArr = [
    {
        name: '首页',
        alias: 'global overview',
        instructions: '首页',
        id: 1,
        name_A: 'JQZL',
        img: qckq,
        imgSelect: jqzl,
    },
    {
        name: '后陈',
        alias: 'HouChen',
        instructions: '后陈',
        id: 2,
        name_A: 'JQHD',
        img: dckq,
        imgSelect: jqhd,
    },
    {
        name: '街区客流',
        alias: 'On site passenger flow',
        instructions: '鹿邑',
        id: 3,
        name_A: 'JQKL',
        img: cnkl,
        imgSelect: jqkl,
    },
    {
        name: '全貌',
        alias: 'panorama',
        instructions: '全貌',
        id: 4,
        img: znyj,
        imgSelect: jqxf,
    },
];
const wdhg = [
    { name: '鹿邑', location: [115.48553, 33.8593] },
    { name: '后陈', location: [115.4109739, 33.8762738] },
    { name: '赵村', location: [115.3559078, 33.8767533] },
    { name: '罗庄', location: [115.3777546, 33.847735] },
    { name: '穆店乡', location: [111.49541, 28.90869] },
]
const ldly = [
    { name: '3.练兵场', },
    { name: '5.再回延安', },
]
const homeLeftData = [
    { name: '五大核心', id: 1 },
    { name: '景区实时客流', id: 2 }
]
const jqkd_Data = [
    { name: '客流来源', name_A: 'KLLY', },
    { name: '景区实时客流', name_A: 'JQSSKL', },
]

const panoramaData = [
    {
        name: '河南省',
        instructions: '河南省',
        img: qckq,
        imgSelect: jqzl,
        id: 1,
    },
    {
        name: '周口市',
        instructions: '周口市',
        img: dckq,
        imgSelect: jqhd,
        id: 2,
    },
    {
        name: '鹿邑县',
        instructions: '鹿邑县',
        img: cnkl,
        imgSelect: jqkl,
        id: 3,
    },
]
type Props = {

}

const Index: FC<Props> = () => {


    const [tabID, setTabID] = useState(1);
    const [tabName, settabName] = useState('街区标题');
    const [jqzlBtn, setJqzlBtn] = useState('街区总览BTN');  // 共同判断一个 就不需要下面两个了
    // const [wdhcName, setWdhcName] = useState('五大会场');
    // const [ldlyName, setLdlyName] = useState('两大乐园');
    const [jqhdBtn, setJqhdBtn] = useState('街区活动BTN'); // 同上
    // const [dqhdName, setDqhdName] = useState('当前活动');
    // const [jqhdName, setJqhdName] = useState('近期活动');
    const [jqklImg, setJqklImg] = useState('客流来源'); // 街区客流

    const [homeActive, setHomeActive] = useState(1)
    const [panoramaActive, setPanoramaActive] = useState(1)
    const [city, setCity] = useState(0)
    const [isStarted, setIsStarted] = useState(false);
    const [cityArr, setCityArr] = useState(henansheng)
    const [active, setActive] = useState('')

    const intervalRef: React.MutableRefObject<any | NodeJS.Timeout> = useRef(null);


    const reset = useRef();
    const leftRef = useRef()
    const rightRef = useRef()
    useEffect(() => {
        window.addEventListener('resize', resizeTTY);
        return () => {
            window.removeEventListener('resize', resizeTTY);
        };
    });
    useEffect(() => {
        // 1 contextmenu 我们可以禁用右键菜单
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        })
        // 2 禁止选中文字 selectstart
        document.addEventListener('selectstart', function (e) {
            e.preventDefault();
        })
    }, [])


    function resizeTTY() {
        reset.current.style.transform = `scale(${screenRatio()}) rotate(0deg)`;
    }

    // 切换城市清空活跃
    useEffect(() => {
        setCity(0)
    }, [panoramaActive])

    useEffect(() => {
        if (isStarted) {
            const channel = new BroadcastChannel('location');
            const sendArray = (index: number) => {
                const sendNextItem = () => {
                    if (index < henansheng.length) {
                        channel.postMessage(henansheng[index]);
                        index++;
                    } else {
                        index = 0; // 重新开始发送
                    }
                    intervalRef.current = setTimeout(sendNextItem, 1500);
                };
                sendNextItem();
            };
            sendArray(0); // 开始发送数据
        }

        return () => {
            clearTimeout(intervalRef.current); // 清除延时以防止内存泄漏
        };
    }, [henansheng, isStarted]);


    // useEffect(() => {
    //     let wrapper = document.querySelector('#wrapper')
    //     let jq_wrapper = document.querySelector('#jq_wrapper')
    //     BS(leftRef.current)
    //     BS(rightRef.current)
    // }, [tabID, panoramaActive])

    useEffect(() => {
        if (tabID === 4) BS(rightRef.current)
    }, [tabID, panoramaActive])

    const Close = () => {

    }
    const tabClick = (item: any) => {
        const { id, name, instructions } = item
        const channel = new BroadcastChannel('menu')
        setTabID(id);
        settabName(name);
        channel.postMessage(instructions)
    }
    const wdhcClick = (data: any) => {
        const { properties } = data
        const { longitude, latitude, city } = properties

        const channel = new BroadcastChannel('location')
        const channelModal = new BroadcastChannel('modal')

        const result = { location: { center: [longitude, latitude], zoom: 16 } }
        const modal = modalData.find(item => item.title === city)

        channel.postMessage(result)
        channelModal.postMessage(modal)

        setActive(city)
        // setJqzlBtn(data.name)
    }
    const ldlyClick = (data) => {
        setJqzlBtn(data.name)
    }
    function jqklClick(data) {
        setJqklImg(data.name)

    }
    function jqhdClick(data) {
        setJqhdBtn(data._r)
    }

    function SliderChange(time: string) {
        const channel = new BroadcastChannel('time')
        channel.postMessage(time)
    }

    const provinceHandler = (data: any) => {
        const { instructions, id } = data
        const result = id === 1 ? henansheng : id === 2 ? zhoukoushi : []
        setCityArr(result)
        const channel = new BroadcastChannel('mapCity')
        channel.postMessage(instructions)
        setPanoramaActive(id)
    }
    // 地图飞行
    const cityHandler = (data: any) => {
        const channel = new BroadcastChannel('location')
        channel.postMessage(data)
        setCity(data.id)
    }

    const roamHandler = () => {
        const result = !isStarted
        setIsStarted(result)
        // setInterval(() => {
        //     for (let index = 0; index < henansheng.length; index++) {
        //         channel.postMessage(henansheng[index])
        //     }
        // }, 1000)

        // if (city === henansheng.length - 1) {
        //     setCity(0); // 重新从第一个名字开始
        //     console.log(henansheng[city], '   console.log(henansheng[city]);');
        // }

        // const intervalId = setInterval(() => {
        //     setCity(prevIndex => (prevIndex + 1) % henansheng.length);
        //     channel.postMessage(henansheng[city])
        // }, 5000);
    }

    console.log(homeData);

    return (
        <div className={styles.normal}>
            {/* 导航栏 */}
            <div
                ref={reset}
                className={styles.content}
                style={{
                    width: 2048,
                    minHeight: 1536,
                    transform: `scale(${screenRatio()}) rotate(0deg)`,
                }}
            >
                <div style={{ position: 'relative', width: '100%' }}>
                    <div className={styles.title}>
                        <div className={styles.lineScroll}></div>
                        <div className={styles.left}>
                            <img src={icon} alt="" style={{ width: 231 }} />
                            <span className={styles.line}></span>
                            <span className={styles.leftText}>鹿邑后陈大屏数字孪生系统</span>
                        </div>
                        {/* 24小时进度条 */}

                        <div className={styles.right}>
                            <div
                                className={`${styles.box} ${isStarted && styles.boxActive}`}
                                onClick={roamHandler}>
                                重点区域漫游
                            </div>
                            <img
                                onClick={() => Close()}
                                src={loginout}
                                alt=""
                                style={{ width: 81, marginLeft: 52 }}
                            ></img>
                        </div>
                    </div>
                    <div className={styles.middle}>
                        <div className={styles.middlebox}>
                            <div className={styles.tab}>
                                {
                                    DataArr.map((item, index) => {
                                        return (
                                            <div className={styles.tabitem} onClick={() => tabClick(item)} key={index}>
                                                <Card itemObj={item} />
                                            </div>

                                        );
                                    })}
                            </div>
                        </div>
                        <div className={styles.foot}>
                            {tabID === 2 ? (
                                <div className={styles.contentBox}>
                                    <div className={styles.boxLeft}>
                                        {
                                            homeLeftData.map((data, index) => {
                                                return (
                                                    <div className={homeActive === data.id ? styles.box2 : styles.box1}
                                                        key={index}
                                                        onClick={() => { setHomeActive(data.id) }}
                                                    >
                                                        <span>
                                                            {data.name}
                                                        </span>
                                                        {homeActive === data.id ? (<div className={styles.fade}></div>) : null}
                                                    </div>
                                                )
                                            })
                                        }
                                        {homeActive === 1 && (
                                            <div className={styles.wrapper}>
                                                <div className={styles.floortab}>
                                                    {
                                                        homeData.features.map((data, index) => {
                                                            return (
                                                                <div className={active === data.properties.city ? styles.dckqItemSelect : ''}
                                                                    onClick={() => wdhcClick(data)}
                                                                    key={index}>
                                                                    {data.properties.city}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )}
                                        {homeActive === 2 && (
                                            <div className={styles.Timeline}>
                                                <TimeSlider SliderChange={SliderChange} />
                                            </div>
                                        )}

                                    </div>
                                    {/* <div className={styles.boxRight}>
                                        <div className={styles.cnklLeft}>
                                            <div className={styles.foottit1} >
                                                <img src={wdhc_img} alt="" className={styles.wdhc_img}></img>
                                                <span className={styles.foottitText}>两大乐园</span>
                                            </div>
                                        </div>
                                        <div id="jq_wrapper" className={styles.wrapper}>
                                            <div className={styles.floortab}>
                                                {
                                                    wdhg &&
                                                    ldly.map((data, index) => {
                                                        return (
                                                            <div className={jqzlBtn === data.name ? styles.dckqItemSelect : ''}
                                                                onClick={() => ldlyClick(data)}
                                                                key={index}>
                                                                {data.name}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div> */}
                                </div>) : null}
                            {/* 街区活动 */}
                            {tabID === 1 ? (
                                <div className={styles.contentBox}>
                                    <div className={styles.boxLeft}>
                                        <div className={styles.cnklLeft}>
                                            <div className={styles.foottit1}>
                                                <img src={wdhc_img} alt="" className={styles.wdhc_img}></img>
                                                <span className={styles.foottitText}>当前活动</span>
                                            </div>
                                        </div>
                                        <div id="wrapper" className={styles.wrapper}>
                                            <div className={styles.floortab}>
                                                {
                                                    DataArr.map((data, index) => {
                                                        return (
                                                            <div key={index} className={jqhdBtn === data._r ? styles.dckqItemSelect : ''}
                                                                onClick={() => dqhdClick(data)}
                                                                key={data._r}>
                                                                {data.f0000}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.boxRight}>
                                        <div className={styles.cnklLeft}>
                                            <div className={styles.foottit1}>
                                                <img src={wdhc_img} alt="" className={styles.wdhc_img}></img>
                                                <span className={styles.foottitText}>近期活动</span>
                                            </div>
                                        </div>
                                        <div id="jq_wrapper" className={styles.wrapper}>
                                            <div className={styles.floortab}>
                                                {
                                                    DataArr.map((data, index) => {
                                                        return (
                                                            <div className={jqhdBtn === data._r ? styles.dckqItemSelect : ''}
                                                                onClick={() => jqhdClick(data)}
                                                                key={data._r}>
                                                                {/* 使用后端发过来的 唯一码 提高效率 */}
                                                                {data.name}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {/* 街区客流 */}
                            {tabID === 3 ? (
                                <div className={styles.cnklLeft}>
                                    {
                                        jqkd_Data.map((data, index) => {
                                            return (
                                                <div className={jqklImg === data.name ? styles.box2 : styles.box1}
                                                    key={index}
                                                    onClick={() => jqklClick(data)}
                                                >
                                                    <span>
                                                        {data.name}
                                                    </span>
                                                    {jqklImg === data.name ? (<div className={styles.fade}></div>) : null}
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        tabID === 3 &&
                                            jqklImg !== '景区实时客流' ? null :
                                            <div className={styles.Timeline}>
                                                <TimeSlider SliderChange={SliderChange} />
                                            </div>}
                                </div>
                            )
                                : null}
                            {/* 街区消费 */}
                            {tabID === 4 ? (
                                <div className={styles.contentBox}>
                                    <div className={styles.boxLeft}>
                                        <div className={styles.cnklLeft}>
                                            <div className={styles.foottit1} >
                                                <img src={wdhc_img} alt="" className={styles.wdhc_img}></img>
                                                <span className={styles.foottitText}>{lengthToChinese(panoramaData)}大核心</span>
                                            </div>
                                        </div>
                                        <div style={{ padding: '50px 0' }}>
                                            <div ref={leftRef} id="wrapper" className={styles.wrapper}>
                                                <div className={styles.content}>
                                                    {panoramaData.map((item, i) => (
                                                        <button
                                                            className={`${styles.itemSelect} ${panoramaActive === item.id && styles.itemSelectActive}`}
                                                            onClick={() => { provinceHandler(item) }} key={i}
                                                        >
                                                            {item.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.boxRight}>
                                        <div className={styles.cnklLeft}>
                                            <div className={styles.foottit1} >
                                                <img src={wdhc_img} alt="" className={styles.wdhc_img}></img>
                                                <span className={styles.foottitText}>{lengthToChinese(cityArr)}大城市</span>
                                            </div>
                                        </div>
                                        <div ref={rightRef} id="jq_wrapper" className={styles.wrapper}>
                                            <div className={styles.floortab}>
                                                {
                                                    cityArr.map((data, index) => {
                                                        return (
                                                            <button
                                                                className={`${styles.itemSelect} ${city === data.id && styles.itemSelectActive}`}
                                                                onClick={() => cityHandler(data)}
                                                                key={index}>
                                                                {data.name}
                                                            </button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>) : null}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default Index