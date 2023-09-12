import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'umi';
import { BS } from '@/utils/BetterScroll'

import styles from './style.less'

const getType = v => v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
const Index = ({ message, title }) =>
{
    const dispatch = useDispatch();
    const scrollRef = useRef()
    useEffect(() =>
    {
        const scroll = document.querySelector('#scroll');
        BS(scrollRef.current)
    }, [scrollRef.current])
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
                                <div key={`${item}${i}`} className={styles.container}>
                                    <div className={styles.key}>{item + '：'}</div>
                                    <div className={styles.text}><span>{message[item]} </span></div>
                                </div>
                            )
                        })}
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
export default Index