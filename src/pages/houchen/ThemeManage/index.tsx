import { useEffect } from 'react';
import styles from './style.less'
import { useDispatch } from 'umi';

import Title from './Title'
import Menu from './Menu'
import Theme from './Theme'
const Index = () => {
    const dispatch = useDispatch();
    // 跨页面通信
    useEffect(() => {
        const channel = new BroadcastChannel('houchen')
        channel.onmessage = e => {
            const { data } = e
            dispatch({
                type: 'houchenModel/setMenu',
                payload: data
            })
        }
    }, [])
    return (
        <div className={styles.themeManage}>
            <Title />
            <Menu />
            <Theme />
        </div>
    );
};
export default Index