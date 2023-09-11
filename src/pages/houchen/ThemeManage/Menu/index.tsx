import { FC, useState, memo } from 'react';
import styles from './style.less'
import { useDispatch } from 'umi';

import home from '@/assets/houchen/icon/icon/home.png'
import houchen from '@/assets/houchen/icon/icon/houchen.png'
import xiancheng from '@/assets/houchen/icon/icon/xiancheng.png'
import huanjing from '@/assets/houchen/icon/icon/huanjing.png'


import active_home from '@/assets/houchen/icon/active_icon/home.png'
import active_houchen from '@/assets/houchen/icon/active_icon/houchen.png'
import active_xiancheng from '@/assets/houchen/icon/active_icon/xiancheng.png'
import active_huanjing from '@/assets/houchen/icon/active_icon/huanjing.png'

import itemImg from '@/assets/houchen/icon/item.png'
import itemActiveImg from '@/assets/houchen/icon/itemActive.png'

const navData = [
    { name: '首页', id: 1, img: home, activeImg: active_home },
    { name: '后陈', id: 2, img: houchen, activeImg: active_houchen },
    { name: '鹿邑', id: 3, img: xiancheng, activeImg: active_xiancheng },
    { name: '环境', id: 4, img: huanjing, activeImg: active_huanjing },
    {
        name: '杜大坑', id: 5
    },
    {
        name: '穆店乡', id: 6
    }
]
type MenuType = {
    // menu: String[]
}
const Index: FC<MenuType> = () => {
    const dispatch = useDispatch();
    const [isShow, setIsShow] = useState(false)
    const [navDataActive, setNavDataActive] = useState<number>(1);

    const click = () => {
        setIsShow(!isShow)
    }
    type NavClick = {
        id: number,
        name: string
    };

    const navClick = ({ id, name }: NavClick) => {
        dispatch({
            type: 'houchenModel/setMenu',
            payload: name
        });
        setNavDataActive(id)
    }
    return (
        <div
            // style={{ transform: `rotate(-${rotate}deg)`, transition: 'all 1s' }}
            // onMouseLeave={handleMouse(false)}
            className={isShow ? styles.container : styles.containerActive}>
            <div className={styles.warp}>
                <a className={styles.menu_toggler} onClick={click}>
                    <button className={styles.btn_class_name} >
                        <span className={styles.back} ></span>
                        <span className={styles.front}></span>
                    </button>
                </a>
                <div style={isShow ? { transform: 'scale(1)', transition: 'all 1s' } : { transform: 'scale(.3)', transition: 'all 1s' }} className={isShow ? styles.menuWarp : styles.menuWarpActive}>
                    <nav className={styles.menu}>
                        <ul>
                            {navData.map((data, index) => (
                                <li style={isShow ? { transform: `rotate(${360 / navData.length * index}deg) translateX(-105px)` } : undefined} key={index} className={`${styles.menu_item} ${isShow && styles.menu_item_active} `}  >
                                    <a
                                        onClick={() => { navClick(data) }}
                                        className={`${navDataActive === data.id && styles.active_nav_item} ${styles.nav_item}`}
                                        style={navDataActive === data.id ? { backgroundImage: `url(${itemActiveImg} )`, backgroundSize: '100% 100%', transform: `rotate(-${360 / navData.length * index}deg)`, transition: 'all 1s' } :
                                            { backgroundImage: `url(${itemImg} )`, backgroundSize: '100% 100%', transform: `rotate(-${360 / navData.length * index}deg)`, transition: 'all 1s' }}>
                                        <img style={{ width: '20px', height: '20px' }} src={navDataActive === data.id ? data.activeImg : data.img} alt={data.name} />
                                        <span> {data.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

        </div >
    );
};

export default memo(Index) 