import { FC, memo, useEffect, useState, Fragment } from 'react'
import { connect } from 'dva';
// import Home from './Home'
import Home from './Home1'
import Houchen from './HouChen1'
import Panorama from './Panorama1'
import Luyi from './Luyi/index'
type Props = ReturnType<typeof mapStateToProps> & {
}

const Index: FC<Props> = ({ menu }) => {
    const [childComponent, setChildComponent] = useState<JSX.Element | null>(null);
    // 主题切换
    useEffect(() => {
        const mapElement: { [key: string]: () => JSX.Element } = {
            '首页': () => <Home />,
            '后陈': () => <Houchen />,
            '鹿邑': () => <Luyi />,
            '全貌': () => <Panorama />,
        };
        if (mapElement[menu]) {
            // 运行对应的函数，得到子组件
            const component = mapElement[menu]();
            setChildComponent(component);
        }
    }, [menu]);
    return (
        <Fragment>
            {childComponent}
        </Fragment>
    )
};

const mapStateToProps = ({ houchenModel }: { houchenModel: { menu: string } }) => {
    return {
        menu: houchenModel.menu
    }
}
export default connect(mapStateToProps)(memo(Index));