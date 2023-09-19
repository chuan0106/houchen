import { FC, memo, useEffect, useState, Fragment } from 'react'
import { connect } from 'dva';
import HomeMarkers from './HomeMarkers'
import HouchenMarkers from './HouchenMarkers'

interface Props {
    menu: string;
    onMarkerClick: Function;
    mapRef: any;
    map: any
}
const Index: FC<Props> = ({ menu, onMarkerClick, mapRef, map }) => {
    const [childComponent, setChildComponent] = useState<JSX.Element | null>(null);
    useEffect(() => {


        const commonProps = { onMarkerClick, mapRef };
        const mapInfo = mapRef.current
        const mapElement: { [key: string]: () => JSX.Element } = {
            '首页': () => {
                mapInfo.getMap().easeTo({
                    zoom: 13,
                    // pitch: 62,
                    longitude: 115.4109739,
                    latitude: 33.8762738,
                    minZoom: 12,
                    maxZoom: 19,
                });
                return <HomeMarkers {...commonProps} />;
            },
            '后陈': () => {
                mapInfo.getMap().easeTo({
                    center: [115.4059739, 33.8782738],
                    zoom: 16,
                    duration: 2000,
                });
                return <HouchenMarkers {...commonProps} />
            },
            '鹿邑': () => {
                mapInfo.getMap().easeTo({
                    center: [115.48553, 33.8593],
                    zoom: 12,
                    duration: 2000,
                });
                return <HomeMarkers {...commonProps} />
            },
        };

        if (mapElement[menu]) {
            // 运行对应的函数，得到子组件
            const component = mapElement[menu]();
            setChildComponent(component);
        }
    }, [menu]);
    console.log(map);
    return (
        <Fragment>
            {childComponent}
        </Fragment>
    )
};

const mapDispatchToProps = ({ houchenModel }: { houchenModel: any }) => {
    return {
        menu: houchenModel.menu,
        map: houchenModel.map
    }
}

export default connect(mapDispatchToProps)(memo(Index));
