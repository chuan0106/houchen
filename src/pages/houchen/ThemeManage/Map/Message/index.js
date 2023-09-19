import { useState, useEffect, useRef, memo, Fragment } from 'react';
import { useDispatch } from 'umi';
import { connect } from 'dva';
import { BS } from '@/utils/BetterScroll'
import styles from './style.less'

const getType = v => v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
const Index = ({ message, title, popupInfo }) =>
{
    const [bsContainer, setBsContainer] = useState(null)
    const dispatch = useDispatch();
    const scrollRef = useRef()
    const betterRef = useRef(); // 使用 useRef 来存储 better-scroll 实例
    useEffect(() =>
    {
        if (scrollRef.current)
        {
            betterRef.current = BS(scrollRef.current, setBsContainer)
        }
        return () =>
        {
            if (bsContainer)
            {
                bsContainer.destroy()
            }
        }
    }, [scrollRef.current, popupInfo])


    const titleType = getType(title)
    const isUndefined = titleType === 'undefined'
    const titleResult = titleType === 'string' ? title : titleType === 'object' ? title.name : null
    let property = [];
    for (const key in message)
    {
        if (Object.hasOwnProperty.call(message, key))
        {
            property.push(key)
        }
    }
    console.log(popupInfo, 'popupInfodsd');
    return (
        <div id='container' className={`${styles.divStyle} ${styles.fadeIn}`} >
            <div style={{ paddingTop: isUndefined && 0 }} className={styles.core}>
                {!isUndefined && (
                    <div className={styles.title}>
                        <span style={{ '--color': title.color }}>{titleResult}</span>
                    </div>)}
                <section ref={scrollRef} id='scroll'>
                    <div>
                        {property.map((item, i) =>
                        {
                            return (
                                <Fragment key={i}>
                                    <div className={styles.container}>
                                        <div className={styles.model_title}>{item + '：'}</div>
                                        <div className={styles.model_value}><span>{message[item]} </span></div>
                                    </div>
                                </Fragment>
                            )
                        })}
                        {/* <img height={'200px'} className={styles.model_img} src={popupInfo?.image} alt="" /> */}
                    </div>
                </section>
                <footer>
                </footer>
                <div className={styles.buttonContainer}>
                    <button className={styles.rotateBtn} onClick={() =>
                    {
                        dispatch({
                            type: 'houchenModel/setPopupInfo',
                            payload: null
                        })
                    }}>确定</button>
                </div>
            </div>
        </div>
    );
};






function mapStateToProps ({ houchenModel })
{
    return {
        popupInfo: houchenModel.popupInfo
    }
}
export default connect(mapStateToProps)(memo(Index));