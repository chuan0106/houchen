import { FC, useState, useEffect } from 'react';
import styles from './style.less'
import TimeSlider from '@/components/TimeSlider'
import { homeData } from '@/pages/data/map'
const menu = [
    { name: '客流来源', id: 1 },
    { name: '景区实时客流', id: 2 },
]
const modalData = [
    { title: '鹿邑', content: '鹿邑县地方特产有宋河粮液、鹿邑大曲、鹿邑草帽、张店尾毛、观堂麻片、邱集烧饼、鹿邑卤鸡、 孔集烧鸡、试量狗肉、辛集麻花、鹿邑妈糊、娃娃鱼粉丝汤、高集烧饼等。', id: 1 },
    { title: '后陈胡同', content: `后陈胡同位于鹿邑县谷阳街道，此处有公园、农庄、集市等。后陈胡同可以观看农村风景，购买各式各样的农产品。平方米`, id: 2 },
    { title: '赵村乡', content: '赵村乡地处鹿邑县中部，东和谷阳街道毗邻，东南、南与生铁冢镇相接，西南、西与试量镇相依，西北与丘集乡接壤，北，东北邻穆店乡，距鹿邑县城12千米， [1] 区域总面积63.87平方千米。', id: 3 },
    { title: '罗庄', content: '不知道什么情况，但似乎发生过什么事情！', id: 4 },
    { title: '桃源县', content: '距离那么远，似乎有乐宝的身影...', id: 5 },
]
type Props = {

}
const Index: FC<Props> = () => {
    const [homeActive, setHomeActive] = useState(1)
    const [active, setActive] = useState('')


    function SliderChange(time: string) {
        const channel = new BroadcastChannel('time')
        channel.postMessage(time)
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
    }

    const nameHandler = (name: string) => {
        setActive(name)   // 高亮
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.boxLeft}>
                {
                    menu.map((data, index) => {
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
                                            onClick={() => nameHandler(data.properties.city)}
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
        </div>
    );
};
export default Index