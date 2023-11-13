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
        const menu_channel = new BroadcastChannel('menu')
        const mapCity_channel = new BroadcastChannel('mapCity')
        menu_channel.onmessage = e => {
            const { data } = e
            dispatch({
                type: 'houchenModel/setMenu',
                payload: data
            })
        }

        mapCity_channel.onmessage = e => {
            const { data } = e
            console.log(data, 'dsalkjcxzlksa');

            dispatch({
                type: 'houchenModel/setMapCity',
                payload: data
            })
        }
    }, [])
    return (
        <div className={styles.themeManage}>
            <Title />
            {/* <Menu /> */}
            <Theme />
        </div>
    );
};
export default Index