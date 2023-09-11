import { useMemo } from 'react';
import { Marker } from 'react-map-gl';
import { connect } from 'dva';
import cities from './data/houchen.json'

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

type MapMarkersType = {
    onMarkerClick: Function,
    mapRef: any,
    viewState: any
}

function MapMarkers({ onMarkerClick, mapRef, viewState }: MapMarkersType) {
    const onMarkerHandler = (e, city) => {
        onMarkerClick(city)
        e.originalEvent.stopPropagation();
        mapRef.current.getMap().easeTo({
            center: [city.longitude, city.latitude], // 新的经纬度
            zoom: 16, // 新的缩放级别
            duration: 1000, // 过渡动画持续时间（以毫秒为单位）
        });
    }

    // const visibleMarkers = cities.filter((marker) => marker.zoom < viewState.zoom);
    const markers = useMemo(() => {
        return cities.map((city, index) => {
            let img = null
            for (const iterator of imgs) {
                if (iterator.id === city.id) {
                    img = iterator.img
                }
            }

            return <Marker
                key={`marker-${index}`}
                longitude={city.longitude}
                latitude={city.latitude}
                anchor="right"
                onClick={(e) => onMarkerHandler(e, city)}
            >
                <div style={{ display: "flex", alignItems: 'center' }}>


                    {/* <Pin /> */}
                    <img style={{ width: '25px', height: '25px', borderRadius: '50%' }} src={img} alt="" />
                    <div>{city.city}</div>
                </div>
            </Marker>
        });
    }, [cities, onMarkerHandler]);


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