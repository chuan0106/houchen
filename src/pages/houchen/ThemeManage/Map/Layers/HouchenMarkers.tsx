import { useMemo } from 'react';
import { Marker } from 'react-map-gl';
import { connect } from 'dva';
import { houchenData } from './data/main'
import { MarkerFeature } from '@/interface/houchen/map'

import chuan from '@/assets/person/chuan.jpg'
import gao from '@/assets/person/gao.jpg'
import shuai from '@/assets/person/shuai.jpg'
import wei from '@/assets/person/wei.jpg'
import shaozhu from '@/assets/person/shaozhu.jpg'

const imgs = [
    { img: chuan, id: 1 },
    { img: gao, id: 2 },
    { img: shuai, id: 3 },
    { img: wei, id: 4 },
    { img: shaozhu, id: 6 }
]

type setPopupInfoType = {
    type: string;
    payload: Record<string, any>;
}
type MapMarkersType = {
    onMarkerClick: Function,
    mapRef: any,
    viewState: any,
    dispatch: (action: setPopupInfoType) => void;
}

function MapMarkers({ onMarkerClick, mapRef, viewState, dispatch }: MapMarkersType) {

    const onMarkerHandler = (e: any, city: MarkerFeature) => {

        const { geometry: { coordinates: center }, properties } = city
        const setPopupInfoAction: setPopupInfoType = {
            type: 'houchenModel/setPopupInfo',
            payload: properties
        }
        dispatch(setPopupInfoAction)
        // onMarkerClick(city)
        e.originalEvent.stopPropagation();
        mapRef.current.getMap().easeTo({
            center, // 新的经纬度
            zoom: 16, // 新的缩放级别
            duration: 1000, // 过渡动画持续时间（以毫秒为单位）
        });

    }

    // const visibleMarkers = cities.filter((marker) => marker.zoom < viewState.zoom);
    const markers = useMemo(() => {
        return houchenData.features.map((city, index) => {
            const { geometry, properties } = city
            let img;
            for (const iterator of imgs) {
                if (iterator.id === properties.id) {
                    img = iterator.img
                }
            }

            return <Marker
                key={`marker-${index}`}
                longitude={geometry.coordinates[0]}
                latitude={geometry.coordinates[1]}
                anchor="right"
                onClick={(e) => onMarkerHandler(e, city)}
            >
                <div style={{ display: "flex", alignItems: 'center', cursor: 'pointer' }}>
                    {/* <Pin /> */}
                    <img style={{ width: '25px', height: '25px', borderRadius: '50%' }} src={img} alt="" />
                    <div>{properties.city}</div>
                </div>
            </Marker>
        });
    }, [houchenData, onMarkerHandler]);

    return (
        <>
            {markers}
        </>
    )
}

function mapStateToProps({ houchenModel }: any) {
    return {
        viewState: houchenModel.viewState
    }
}
export default connect(mapStateToProps)(MapMarkers);