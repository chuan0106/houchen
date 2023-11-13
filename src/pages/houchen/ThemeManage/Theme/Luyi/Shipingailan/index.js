import { useState, useEffect } from 'react';
import styles from './style.less'
import { FoldingLineChart } from './Tootal'
const dataObj = {
    fault: 18.51,
    arr: [
        { name: '在线', num: 22, id: 1 },
        { name: '故障', num: 5, id: 2 },
        { name: '总台数', num: 27, id: 3 },
    ]
}
const index = () =>
{
    const [data, setData] = useState(dataObj)
    useEffect(() =>
    {
        FoldingLineChart('#line');
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.flex}>
                <h1 className={styles.postTitle}>
                    <div className={styles.title}>全局概览</div>
                </h1>
                <div className={styles.SelectWarp}>实时</div>
            </div>

            <div className={styles.core}>
                <div className={styles.hade}>
                    {data?.arr?.map((item, i) => (
                        <div className={styles.item}><span>{item.name}：</span><span>{item.num}台</span> </div>
                    ))}
                </div>
                <div id='line' className={styles.chart}>

                </div>
                <div className={styles.content}>
                    <div>故障率</div>
                    <div className={styles.num}>{data?.fault}%</div>
                </div>
            </div>

        </div>
    );
};
export default index