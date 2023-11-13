import { FC, useState } from 'react';
import styles from './style.less'

type Props = {

}
const Index: FC<Props> = ({ itemObj }) => {
    const { name, alias } = itemObj
    const trackers = Array.from({ length: 25 }, (_, index) => index + 1);
    return (
        <div className={`${styles.container} ${styles.noselect}`}>
            <div className={styles.canvas} >
                {trackers.map((_, trackerIndex) => (
                    <div key={`tracker-${trackerIndex}`} className={`${styles.tracker} ${styles[`tr-${trackerIndex + 1}`]}`}></div>
                ))}
                <div className={styles.card} >
                    <p className={styles.prompt} >{name}</p>
                    <div className={styles.title}>{name},<br />{alias}</div>
                    {/* <div className={styles.subtitle}>mouse hover tracker</div> */}
                </div>
            </div>
        </div>
    );
};
export default Index