import { FC, useState, useRef } from 'react';
import styles from './style.less'

type Props = {
    percent: any;
    unSelectedColor: any;
    strokeColor: any;
    value: any;
}
const Index: FC<Props> = ({ percent, unSelectedColor, strokeColor, value }) => {
    const [count, setCount] = useState(percent)
    console.log(count, 'countcount');


    const myRef = useRef(null)
    const bgDown = (e) => {
        e = e || window.event
        const { nativeEvent: { offsetX } } = e
        setCount(Math.round(offsetX / myRef.current.clientWidth * 100))
        // ! 如果是当前的节点触发的话 超出该dom将无法持续触发 体验效果不好 所以 可以换成 document
        myRef.current.addEventListener('mousemove', fn)
        // ! 这样的话 即使超出该 DOM 依旧会触发该函数
        // document.addEventListener('mousemove', fn)
        function fn(e) {
            // ! offsetX 当前鼠标点击的位置
            const { offsetX } = e
            // ? round 取整 不需要可以去掉这个 Math.round
            let newCount = Math.round(offsetX / myRef.current.clientWidth * 100)
            newCount <= 100 ? setCount(newCount) : setCount(100)
        }
        document.addEventListener('mouseup', (() => {
            // ! 替换为 document 并且取消点击事件
            myRef?.current?.removeEventListener('mousemove', fn);
            // document.removeEventListener('mousemove', fn);
        }))
    }

    return (
        <div className={`${styles.progress} ${styles.progress_line} ${styles.progress_show_info}`}>
            <div className={styles.progress_outer}>
                <div id='inner' ref={myRef} style={{ backgroundColor: unSelectedColor && unSelectedColor }} onMouseDown={bgDown} className={styles.progress_inner}>
                    <div style={{ width: `${count}%`, backgroundImage: `linear-gradient(to right, ${strokeColor['from']},  ${strokeColor['to']}` }} className={styles.progress_bg}>
                        <div style={{ backgroundColor: unSelectedColor && unSelectedColor }}>  <span>{value}人</span></div>
                    </div>
                </div>

            </div>
            <span className={styles.progress_text}>{`${count}%`}</span>
        </div>
    );
};
export default Index