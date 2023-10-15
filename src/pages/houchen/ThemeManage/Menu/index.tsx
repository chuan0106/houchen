import { FC, useState, useEffect, memo } from 'react';
import styles from './style.less'
import { connect } from 'dva';
import ColorThief from 'ColorThief'
import type { dispatchType, activeDispatch, toolBarType } from '@/interface/houchen'
import type { MapInstanceType } from '@/interface/houchen/map'

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

const nav = [
    { name: '首页', id: 1, img: home, activeImg: active_home },
    { name: '后陈', id: 2, img: houchen, activeImg: active_houchen },
    { name: '鹿邑', id: 3, img: xiancheng, activeImg: active_xiancheng },
    { name: '全貌', id: 4, img: huanjing, activeImg: active_huanjing },
]

const tool = [
    {
        name: '测距', id: 5
    },
    {
        name: '穆店乡', id: 6
    }
]

type MenuType = ReturnType<typeof mapStateToProps> & {
    dispatch: activeDispatch
}
const Index: FC<MenuType> = ({ toolBar, dispatch, map, mapTheme, menu }) => {
    const [isShow, setIsShow] = useState(false)
    const [navDataActive, setNavDataActive] = useState<number>(1);

    useEffect(() => {
        if (map) {
            map.setPaintProperty('land', 'background-color', mapTheme);
        }
    }, [mapTheme, map])

    const click = () => {
        setIsShow(!isShow)
    }

    type NavClick = {
        id: number,
        name: string,
        activeImg: any
    };

    // 颜色偷取器
    const getColor = async (imageUrl: any) => {
        let isRequestPending = false; // 将标志位移到函数内部

        if (isRequestPending) {
            // 如果有之前的请求，直接返回，避免重复请求
            return;
        }

        isRequestPending = true;

        const colorThief = new ColorThief();
        const html = document.documentElement;
        const image = new Image();
        image.src = imageUrl;

        try {
            await image.decode(); // 等待图像解码完成
            let colors = await colorThief.getPalette(image, 3);
            colors = colors.map((c: any) => `rgba(${c[0]},${c[1]},${c[2]},.2)`);
            const active: dispatchType = {
                type: 'houchenModel/setMapTheme',
                payload: colors[0]
            }
            dispatch(active);
            const gradient = `radial-gradient(circle, ${colors.join(', ')})`;
            html.style.setProperty('background', gradient);
        } catch (error) {
            console.error(error);
        } finally {
            isRequestPending = false; // 重置标志位
        }
    }


    const handleImageClick = async (imageUrl: any) => {
        const image = new Image();
        image.src = imageUrl;
        if (image.complete) {
            getColor(image)
        } else {
            image.addEventListener('load', function () {
                getColor(imageUrl)
            });
        }
    };

    const navClick = ({ id, name, activeImg }: NavClick) => {
        handleImageClick(activeImg)
        const active: dispatchType = {
            type: 'houchenModel/setMenu',
            payload: name
        }
        dispatch(active);
        setNavDataActive(id)
    }

    const toolBarHandler = async (name: string) => {
        // 检查项目是否已经选择
        const isSelected = toolBar.includes(name);
        if (isSelected) {
            // 如果已经选择，从选定项目列表中移除
            const result = toolBar.filter((item) => item !== name)
            const setToolBar: dispatchType = {
                type: 'houchenModel/setToolBar',
                payload: result
            }
            dispatch(setToolBar);
        } else {
            // 如果未选择，添加到选定项目列表中
            const setToolBar: dispatchType = {
                type: 'houchenModel/setToolBar',
                payload: [...toolBar, name]
            }
            dispatch(setToolBar);
        }
    }

    return (
        <div
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
                            {nav.map((data, index) => (
                                <li
                                    style={isShow ? { transform: `rotate(${360 / (nav.length + tool.length) * index}deg) translateX(-105px)` } : undefined}
                                    key={index}
                                    className={`${styles.menu_item} ${isShow && styles.menu_item_active}`}
                                >
                                    <a
                                        onClick={() => { navClick(data) }}
                                        className={`${menu === data.name && styles.active_nav_item} ${styles.nav_item}`}
                                        style={
                                            menu === data.name
                                                ? {
                                                    backgroundImage: `url(${itemActiveImg} )`,
                                                    backgroundSize: '100% 100%',
                                                    transform: `rotate(-${360 / (nav.length + tool.length) * index}deg)`,
                                                    transition: 'all 1s',
                                                }
                                                : {
                                                    backgroundImage: `url(${itemImg} )`,
                                                    backgroundSize: '100% 100%',
                                                    transform: `rotate(-${360 / (nav.length + tool.length) * index}deg)`,
                                                    transition: 'all 1s',
                                                }
                                        }
                                    >
                                        <img style={{ width: '20px', height: '20px' }} src={menu === data.name ? data.activeImg : data.img} alt={data.name} />
                                        <span> {data.name}</span>
                                    </a>
                                </li>
                            ))}

                            {tool.map((data, index) => (
                                <li
                                    style={isShow ? { transform: `rotate(${360 / (nav.length + tool.length) * (index + nav.length)}deg) translateX(-105px)` } : undefined}
                                    key={index}
                                    className={`${styles.menu_item} ${isShow && styles.menu_item_active}`}
                                >
                                    <a
                                        onClick={() => { toolBarHandler(data.name) }}
                                        className={`${menu === data.name && styles.active_nav_item} ${styles.nav_item}`}
                                        style={toolBar.includes(data.name)
                                            ? {
                                                backgroundImage: `url(${itemActiveImg} )`,
                                                backgroundSize: '100% 100%',
                                                transform: `rotate(-${360 / (nav.length + tool.length) * (index + nav.length)}deg)`,
                                                transition: 'all 1s',
                                            }
                                            : {
                                                backgroundImage: `url(${itemImg} )`,
                                                backgroundSize: '100% 100%',
                                                transform: `rotate(-${360 / (nav.length + tool.length) * (index + nav.length)}deg)`,
                                                transition: 'all 1s',
                                            }
                                        }
                                    >
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

function mapStateToProps({ houchenModel }: { houchenModel: { toolBar: toolBarType, map: MapInstanceType | null, mapTheme: string, menu: string } }) {
    return {
        menu: houchenModel.menu,
        toolBar: houchenModel.toolBar,
        map: houchenModel.map,
        mapTheme: houchenModel.mapTheme,
    }
}
export default connect(mapStateToProps)(memo(Index));