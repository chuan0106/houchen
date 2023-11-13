import { useState, useEffect, useMemo } from 'react';
import styles from './style.less'
import { connect } from 'dva';
import * as turf from '@turf/turf'
import { Source, Marker, Layer } from 'react-map-gl';
import { getDistance } from 'geolib';
import type { viewStateType } from '@/interface/houchen/map'
import { toolBarType } from '@/interface/houchen'

import { MarkerFeature } from '@/interface/houchen/map'
import Pin from '../Pin';

import { homeData, houchenData } from '@/pages/data/map'

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
    onMarkerClick: Function;
    mapInfo: any;
    viewState: viewStateType;
    menu: string;
    toolBar: toolBarType;
    map: any;
}

type selectedMarkerType = {
    longitude: number;
    latitude: number;
}

function MapMarkers({ mapInfo, viewState, menu, toolBar, map, }: MapMarkersType) {

    const [selectedMarker, setSelectedMarker] = useState<selectedMarkerType | null>(null)
    const [distance, setDistance] = useState(0)

    // const [a, seta] = useState([])
    useEffect(() => {
        const channel = new BroadcastChannel('location')
        channel.onmessage = e => {
            const { data } = e
            mapInfo.getMap().easeTo(data.location);
        }
        return () => {
            channel.close(); // 在组件卸载时关闭 channel
        };
    }, [])
    useEffect(() => {
        const sourceId = 'polygon321';
        if (map) {
            // 检查源是否已存在
            const existingSource = map.getSource(sourceId);
            if (existingSource) {
                // 如果源已存在，则先删除它
                map.removeSource(sourceId);
            }
            const polygonData = {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [115.4029739, 33.87238],
                            [115.4039739, 33.8797],
                            [115.414, 33.8797],
                            [115.414, 33.87338],
                            [115.4029739, 33.87238]
                        ]
                    ]
                }
            };

            map.addSource(sourceId, {
                type: 'geojson',
                data: polygonData
            })
            map.addLayer({
                'id': 'dsalkj',
                'type': 'fill',
                'source': sourceId,
                'layout': {},
                'paint': {
                    'fill-color': '#50e3c2',
                    'fill-opacity': 0.8
                }
            });
            // const centroid = turf.area(polygonData);
            // console.log(centroid, 111111111111222);
        }
        return () => {
            if (map) {
                map.removeLayer('dsalkj'); // 删除图层
                map.removeSource(sourceId); // 删除源
            }
        };
    }, [map])

    const onMarkerHandler = (e: any, city: MarkerFeature) => {
        e.originalEvent.stopPropagation();

        const { geometry: { coordinates: center }, properties } = city
        const { longitude, latitude } = properties

        if (!selectedMarker) {
            setSelectedMarker({ longitude, latitude })
        } else {
            const distance = getDistance(selectedMarker, { longitude, latitude });
            setSelectedMarker(null)
            setDistance(distance)
        }

        if (toolBar.includes('测距')) return

        // onMarkerClick(city)
        // 飞行
        mapInfo.getMap().easeTo({
            center, // 新的经纬度
            zoom: 16, // 新的缩放级别
            duration: 1000, // 过渡动画持续时间（以毫秒为单位）
        });


    }

    // const visibleMarkers = cities.filter((marker) => marker.zoom <= viewState.zoom || !marker.zoom);
    const markers = useMemo(() => {

        const markerStyle = {
            background: 'yellow',
            borderRadius: '50%',
            padding: '5px',
        };

        return homeData.features.map((city, index) => {
            const { geometry, properties } = city
            const reluct = selectedMarker?.longitude === properties.longitude && properties.latitude === selectedMarker.latitude

            return <Marker
                key={`marker-${index}`}
                longitude={geometry.coordinates[0]}
                latitude={geometry.coordinates[1]}
                anchor="right"
                onClick={(e) => onMarkerHandler(e, city)}
            >
                {/* <div style={active === index ? { display: "flex", alignItems: 'center', ...markerStyle } : { display: "flex", alignItems: 'center' }}> */}
                <div style={reluct ? { display: "flex", alignItems: 'center', ...markerStyle } : { display: "flex", alignItems: 'center' }}>
                    <Pin />
                    <div className={styles.dotted}>{properties.city}</div>
                </div>
            </Marker>
        });
    }, [homeData, onMarkerHandler]);

    const houchen_markers = useMemo(() => {
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
                    {properties.city}
                    <div className={styles.city}>
                        <div className={styles.dotted} ></div>
                        <div className={styles.pulse1} ></div>
                        <div className={styles.pulse2} ></div>
                        <div className={styles.pulse3} ></div>
                    </div>
                </div>
            </Marker>
        });
    }, [houchenData, onMarkerHandler]);

    return (
        <>
            {markers}
            {distance !== 0 && (<div style={{ position: 'absolute', right: 0, top: 0 }}>{distance}米</div>)}
            {/* 筛选层级 人员图层 */}
            {viewState.zoom >= 15 && houchen_markers}
        </>
    )
}
function mapStateToProps({ houchenModel }: any) {
    return {
        map: houchenModel.map,
        viewState: houchenModel.viewState,
        menu: houchenModel.menu,
        toolBar: houchenModel.toolBar
    }
}
export default connect(mapStateToProps)(MapMarkers);