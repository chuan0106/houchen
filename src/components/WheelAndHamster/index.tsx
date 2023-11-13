import { FC, useState } from 'react';
import styles from './style.less'

type Props = {
    size: string
}
const Index: FC<Props> = ({ size = '3' }) => {

    return (
        <div style={{ fontSize: size }} className={styles.container}>
            <div className={styles.wheel_and_hamster} aria-label="Orange and tan hamster running in a metal wheel" role="img">
                <div className={styles.wheel} ></div>
                <div className={styles.hamster} >
                    <div className={styles.hamster__body} >
                        <div className={styles.hamster__head} >
                            <div className={styles.hamster__ear} ></div>
                            <div className={styles.hamster__eye} ></div>
                            <div className={styles.hamster__nose} ></div>
                        </div>
                        <div className={`${styles.hamster__limb} ${styles.hamster__limb__fr}`} ></div>
                        <div className={`${styles.hamster__limb} ${styles.hamster__limb__fl}`} ></div>
                        <div className={`${styles.hamster__limb} ${styles.hamster__limb_br}`} ></div>
                        <div className={`${styles.hamster__limb} ${styles.hamster__limb__bl}`} ></div>
                        <div className={styles.hamster__tail} ></div>
                    </div>
                </div>
                <div className={styles.spoke} ></div>
            </div>
        </div>
    );
};
export default Index