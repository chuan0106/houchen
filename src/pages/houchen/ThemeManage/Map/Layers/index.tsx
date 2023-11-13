import { FC, memo, useEffect, useState, Fragment } from 'react'
import { connect } from 'dva';
import HomeMarkers from './HomeMarkers'
import HouchenMarkers from './HouchenMarkers'
import LuyiMarkers from './LuyiMarkers'
import Panorama from './Panorama'

interface Props {
    menu: string;
    onMarkerClick: Function;
    mapRef: any;
    map: any;
    dispatch: any;
}
const Index: FC<Props> = ({ menu, onMarkerClick, mapRef, dispatch, map }) => {
    const [childComponent, setChildComponent] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const mapInfo = mapRef.current


        const commonProps = { onMarkerClick, mapInfo };

        const mapElement: { [key: string]: () => JSX.Element } = {
            '首页': () => {
                const center = {
                    center: [115.43243155885693, 33.870216449882506],
                    zoom: 13,
                    bearing: 0,
                }
                mapInfo.getMap().easeTo(center);
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
                    center: [115.46313482407419, 33.871450293189724],
                    zoom: 12.2,
                    // duration: 2000,
                });
                return <LuyiMarkers {...commonProps} />
            },
            '全貌': () => {
                dispatch({
                    type: 'houchenModel/setMapCity',
                    payload: '河南省'
                });
                // const center = {
                //     center: [113.55795426467324, 34.109682102772766],
                //     bearing: 0,
                //     // padding: { top: 0, bottom: 0, left: 0, right: 0 },
                //     pitch: 0,
                //     zoom: 6.84
                // }
                // mapInfo.getMap().easeTo(center);
                return <Panorama {...commonProps} />
            },
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

const mapDispatchToProps = ({ houchenModel }: { houchenModel: any }) => {
    return {
        menu: houchenModel.menu,
        map: houchenModel.map
    }
}

export default connect(mapDispatchToProps)(memo(Index));
