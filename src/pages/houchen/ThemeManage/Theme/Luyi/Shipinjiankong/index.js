import styles from './style.less'
import shipinjiankongicon from '@/assets/houchen/icon/shipinjiankongicon.png'
const content = [
    { name: '1号功能区', id: 1, num: 8, state: true },
    { name: '2号功能区', id: 2, num: 9, state: true },
    { name: '3号功能区', id: 3, num: 3, state: false },
    { name: '4号功能区', id: 4, num: 5, state: true },
    // { name: '5号功能区', id: 5, num: 2, state: false },
]
const index = () =>
{
    return (
        <div className={styles.container}>
            <h1 className={styles.postTitle}>
                <div className={styles.title}>全局概览</div>
            </h1>
            <div className={styles.SelectWarp}>实时</div>
            <div className={styles.core}>
                {content.map((item, i) => (
                    <div key={i} className={styles.item}>
                        <div className={styles.img_warp}><img src={shipinjiankongicon} /></div>
                        <span>{item.name}</span>
                        <span>{item.num} 个</span>
                        <span style={{ color: item.state ? '#00DB5B' : '#F8272E' }}>{item.state ? '在线' : '离线'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default index