import { Fragment } from 'react'
import Yujingtongji from './Yujingtongji' // 预警统计
import Shipinjiankong from './Shipinjiankong'  // 视频监控
import Zuijinyujing from './Zuijinyujing'  // 最近预警
import Shipingailan from './Shipingailan'  // 视频概览
const index = () => {
    return (
        <Fragment>
            <Yujingtongji />
            <Shipinjiankong />
            <Zuijinyujing />
            <Shipingailan />
        </Fragment>
    );
};
export default index