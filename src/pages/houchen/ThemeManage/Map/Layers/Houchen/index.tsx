import { FC, useState, useEffect, useMemo } from 'react';
import styles from './style.less'
import { Marker, Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { connect } from 'dva';
import type { MarkerFeature, MarkerProperties } from '@/interface/houchen/map'
import { houchenData } from '@/pages/data/map'
import { scenicArea, scenicAreaData } from '@/pages/data/map/houchen_json/index'

import dd from '../../../../../../assets/common/zxc.jpg'
import {
    CustomerServiceOutlined
} from '@ant-design/icons';

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
    mapInfo: any,
    viewState: any,
    dispatch: (action: setPopupInfoType) => void;
    map: any;
}

const Index = ({ onMarkerClick, mapInfo, viewState, dispatch, map }: MapMarkersType) => {
    const [properties, setProperties] = useState<MarkerProperties | null>(null)
    // useEffect(() => {
    //     function generateCoordinates(start, end, count, controlPoints) {
    //         var coordinates = [];
    //         var numSegments = controlPoints.length + 1;
    //         var segmentCount = Math.floor(count / numSegments);

    //         // 计算每个曲线段的起点和终点
    //         var segmentStart = start;
    //         var segmentEnd = controlPoints[0];

    //         for (var i = 0; i < numSegments; i++) {
    //             // 生成当前曲线段上的坐标点
    //             var segmentCoordinates = generateSegmentCoordinates(segmentStart, segmentEnd, segmentCount);
    //             coordinates = coordinates.concat(segmentCoordinates);

    //             // 更新下一个曲线段的起点和终点
    //             segmentStart = segmentEnd;
    //             segmentEnd = controlPoints[i + 1] || end;
    //         }

    //         return coordinates;
    //     }

    //     function generateSegmentCoordinates(start, end, count) {
    //         var coordinates = [];
    //         var longitudeStep = (end[0] - start[0]) / (count + 1);
    //         var latitudeStep = (end[1] - start[1]) / (count + 1);

    //         for (var i = 1; i <= count; i++) {
    //             var longitude = start[0] + (longitudeStep * i);
    //             var latitude = start[1] + (latitudeStep * i);
    //             coordinates.push([longitude, latitude]);
    //         }

    //         return coordinates;
    //     }

    //     // 示例用法
    //     var start = [115.40659452710702, 33.879357162150356];
    //     var end = [115.48629, 33.86727];
    //     var count = 3000;
    //     var controlPoints = [
    //         [115.43, 33.870],
    //         // [115.48629, 33.86727],
    //     ]; // 减少控制点的数量

    //     var generatedCoordinates = generateCoordinates(start, end, count, controlPoints);
    //     map.addSource('subway-line', {
    //         type: 'geojson',
    //         data: {
    //             type: 'FeatureCollection',
    //             features: [
    //                 {
    //                     type: 'Feature',
    //                     geometry: {
    //                         type: 'LineString',
    //                         coordinates: generatedCoordinates // 替换为正确的地铁线路坐标
    //                     },
    //                     properties: {}
    //                 }
    //             ]
    //         }
    //     });

    //     map.addLayer({
    //         id: 'subway-line',
    //         type: 'line',
    //         source: 'subway-line',
    //         paint: {
    //             'line-color': '#ff0000',
    //             'line-width': 3
    //         }
    //     });

    //     var lineCoordinates = map.getSource('subway-line')._data.features[0].geometry.coordinates;
    //     var currentPointIndex = 0;
    //     var marker = new mapboxgl.Marker().setLngLat(lineCoordinates[currentPointIndex]).addTo(map);

    //     function animateMarker() {
    //         if (currentPointIndex < lineCoordinates.length - 1) {
    //             currentPointIndex++;
    //             marker.setLngLat(lineCoordinates[currentPointIndex]);
    //             setTimeout(animateMarker, 1000); // 每隔1秒更新车辆位置

    //             map.setCenter(lineCoordinates[currentPointIndex]);
    //         }
    //     }

    //     animateMarker();
    // }, [map]);
    // useEffect(() => {
    //     function generateCoordinates(start, end, count, controlPoints) {
    //         var coordinates = [];
    //         var numSegments = controlPoints.length + 1;
    //         var segmentCount = Math.floor(count / numSegments);

    //         // 计算每个曲线段的起点和终点
    //         var segmentStart = start;
    //         var segmentEnd = controlPoints[0];

    //         for (var i = 0; i < numSegments; i++) {
    //             // 生成当前曲线段上的坐标点
    //             var segmentCoordinates = generateSegmentCoordinates(segmentStart, segmentEnd, segmentCount);
    //             coordinates = coordinates.concat(segmentCoordinates);

    //             // 更新下一个曲线段的起点和终点
    //             segmentStart = segmentEnd;
    //             segmentEnd = controlPoints[i + 1] || end;
    //         }

    //         return coordinates;
    //     }

    //     function generateSegmentCoordinates(start, end, count) {
    //         var coordinates = [];
    //         var longitudeStep = (end[0] - start[0]) / (count + 1);
    //         var latitudeStep = (end[1] - start[1]) / (count + 1);

    //         for (var i = 1; i <= count; i++) {
    //             var longitude = start[0] + (longitudeStep * i);
    //             var latitude = start[1] + (latitudeStep * i);
    //             coordinates.push([longitude, latitude]);
    //         }

    //         return coordinates;
    //     }

    //     // 示例用法
    //     var start = [115.40659452710702, 33.879357162150356];
    //     var end = [115.48629, 33.86727];
    //     var count = 300;
    //     var controlPoints = [
    //         [115.43, 33.870],
    //         // [115.48629, 33.86727],
    //     ]; // 减少控制点的数量

    //     var generatedCoordinates = generateCoordinates(start, end, count, controlPoints);
    //     if (map) {
    //         console.log(map, 'dsalkjdsakwa');

    //         map.addSource('subway-line', {
    //             type: 'geojson',
    //             data: {
    //                 "type": "FeatureCollection",
    //                 "features": [
    //                     {
    //                         "type": "Feature",
    //                         "geometry": {
    //                             "type": "LineString",
    //                             "coordinates": generatedCoordinates
    //                         },
    //                         "properties": {}
    //                     }
    //                 ]
    //             }
    //         });

    //         map.addLayer({
    //             id: 'subway-line',
    //             type: 'line',
    //             source: 'subway-line',
    //             paint: {
    //                 'line-color': '#ff0000',
    //                 'line-width': 3
    //             }
    //         });

    //         // 模拟车辆沿着线路行驶的效果
    //         var lineCoordinates = map.getSource('subway-line')._data.features[0].geometry.coordinates;
    //         var currentPointIndex = 0; // 当前车辆所在坐标点的索引
    //         var marker = new mapboxgl.Marker().setLngLat(lineCoordinates[currentPointIndex]).addTo(map);

    //         function animateMarker() {
    //             if (currentPointIndex < lineCoordinates.length - 1) {
    //                 currentPointIndex++;
    //                 marker.setLngLat(lineCoordinates[currentPointIndex]);
    //                 setTimeout(animateMarker, 30); // 每隔1秒更新车辆位置
    //                 console.log({ map });

    //                 // setTimeout(() => {
    //                 map.setCenter(lineCoordinates[currentPointIndex]);

    //                 // console.log(lineCoordinates[currentPointIndex], 'dsajk');

    //                 dispatch({
    //                     type: 'houchenModel/setViewState',
    //                     payload: lineCoordinates[currentPointIndex]
    //                 });

    //                 // }, 1000)

    //             }
    //         }

    //         animateMarker();
    //     }
    //     return () => {
    //         map.removeLayer('subway-line'); // 删除图层
    //         map.removeSource('subway-line'); // 删除源
    //     }
    // }, [map])

    // useEffect(() => {
    //     const sourceId = 'polygon321';
    //     if (map) {
    //         console.log(map, 'dsalkjdsakwa');

    //         // 检查源是否已存在
    //         const existingSource = map.getSource(sourceId);
    //         if (existingSource) {
    //             // 如果源已存在，则先删除它
    //             map.removeSource(sourceId);
    //         }
    //         const polygonData = {
    //             type: 'Feature',
    //             geometry: {
    //                 type: 'Polygon',
    //                 coordinates: [
    //                     [
    //                         [115.4029739, 33.87238],
    //                         [115.4039739, 33.8797],
    //                         [115.414, 33.8797],
    //                         [115.414, 33.87338],
    //                         [115.4029739, 33.87238]
    //                     ]
    //                 ]
    //             }
    //         };

    //         map.addSource(sourceId, {
    //             type: 'geojson',
    //             data: polygonData
    //         })
    //         map.addLayer({
    //             'id': 'dsalkj',
    //             'type': 'fill',
    //             'source': sourceId,
    //             'layout': {},
    //             'paint': {
    //                 'fill-color': '#50e3c2',
    //                 'fill-opacity': 0.8
    //             }
    //         });
    //     }
    //     return () => {
    //         if (map) {
    //             map.removeLayer('dsalkj'); // 删除图层
    //             map.removeSource(sourceId); // 删除源
    //         }
    //     };
    // }, [map])
    const onMarkerHandler = (e: any, city: MarkerFeature) => {

        const { geometry: { coordinates: center }, properties } = city
        const setPopupInfoAction: setPopupInfoType = {
            type: 'houchenModel/setPopupInfo',
            payload: properties
        }
        dispatch(setPopupInfoAction)
        // onMarkerClick(city)
        e.originalEvent.stopPropagation();
        mapInfo.getMap().easeTo({
            center, // 新的经纬度
            zoom: 12, // 新的缩放级别
            duration: 1000, // 过渡动画持续时间（以毫秒为单位）
        });

    }

    const musicMarkersHandler = (e: any, city: MarkerFeature) => {
        const { geometry: { coordinates: center }, properties } = city
        // onMarkerClick(city)
        e.originalEvent.stopPropagation();
        mapInfo.getMap().easeTo({
            center, // 新的经纬度
            zoom: 14, // 新的缩放级别
            duration: 1000, // 过渡动画持续时间（以毫秒为单位）
        });
        setProperties(properties)
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

    const musicMarkers = useMemo(() => {
        return scenicAreaData.features.map((city, index) => {
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
                onClick={(e) => musicMarkersHandler(e, city)}
            >
                <div className={styles.modal} style={{ display: "flex", alignItems: 'center', cursor: 'pointer' }}>
                    {/* <Pin /> */}
                    {/* <img style={{ width: '25px', height: '25px', borderRadius: '50%' }} src={img} alt="" /> */}
                    <CustomerServiceOutlined />
                    {/* <div>{properties.city}</div> */}
                </div>
            </Marker>
        });
    }, [houchenData, onMarkerHandler]);

    <CustomerServiceOutlined />


    const click = () => {
        const lineSource = `lineSource`
        const markerSource = `markerSource`

        function generateCoordinates(start, end, count, controlPoints) {
            var coordinates = [];
            var numSegments = controlPoints.length + 1;
            var totalDistance = calculateDistance(start, end);
            var remainingCount = count;

            // 生成每个曲线段上的坐标点
            for (var i = 0; i < numSegments; i++) {
                var segmentStart = controlPoints[i - 1] || start;
                var segmentEnd = controlPoints[i] || end;
                var segmentDistance = calculateDistance(segmentStart, segmentEnd);
                var segmentCount = Math.floor((segmentDistance / totalDistance) * count);

                // 如果剩余的点数不足以生成当前曲线段的坐标点，则将剩余的点数全部用于当前曲线段
                if (remainingCount < segmentCount) {
                    segmentCount = remainingCount;
                }

                var segmentCoordinates = generateSegmentCoordinates(segmentStart, segmentEnd, segmentCount);
                coordinates = coordinates.concat(segmentCoordinates);
                remainingCount -= segmentCount;
            }

            // 如果还有剩余的点数，将剩余的点数用于最后一个曲线段
            if (remainingCount > 0) {
                var lastSegmentCoordinates = generateSegmentCoordinates(controlPoints[numSegments - 1], end, remainingCount);
                coordinates = coordinates.concat(lastSegmentCoordinates);
            }

            return coordinates;
        }


        function calculateDistance(point1, point2) {
            var lon1 = point1[0];
            var lat1 = point1[1];
            var lon2 = point2[0];
            var lat2 = point2[1];

            // 使用简化的球面三角法计算两点之间的距离
            var R = 6371; // 地球半径（单位：km）
            var dLon = (lon2 - lon1) * (Math.PI / 180);
            var dLat = (lat2 - lat1) * (Math.PI / 180);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var distance = R * c;

            return distance;
        }

        function generateSegmentCoordinates(start, end, count) {
            var coordinates = [];
            var longitudeStep = (end[0] - start[0]) / (count + 1);
            var latitudeStep = (end[1] - start[1]) / (count + 1);

            for (var i = 1; i <= count; i++) {
                var longitude = start[0] + (longitudeStep * i);
                var latitude = start[1] + (latitudeStep * i);
                coordinates.push([longitude, latitude]);
            }

            return coordinates;
        }

        // 示例用法
        var start = [115.40659452710702, 33.879357162150356];
        var end = [115.48629, 33.86727];
        var count = 500;
        var controlPoints = [
            [115.40659452710702, 33.870751180754155],
            [115.4103752318644, 33.87009330957396],
        ]; // 减少控制点的数量

        var generatedCoordinates = generateCoordinates(start, end, count, controlPoints);
        if (map) {
            console.log(map.getStyle().layers, 'map.getStyle().layers');


            const existingSource1 = map.getSource(lineSource);
            const existingSource2 = map.getSource(markerSource);
            if (existingSource1) {
                // 如果源已存在，则先删除它
                map.removeSource(lineSource);
            }
            if (existingSource2) {
                // 如果源已存在，则先删除它
                map.removeSource(markerSource);
            }

            map.addSource(lineSource, {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "LineString",
                                "coordinates": generatedCoordinates
                            },
                            "properties": {}
                        }
                    ]
                }
            });

            map.addLayer({
                id: 'subway-layer',
                type: 'line',
                source: lineSource,
                paint: {
                    'line-color': '#ff0000',
                    'line-width': 3
                }
            });

            // 模拟车辆沿着线路行驶的效果
            var lineCoordinates = generatedCoordinates;
            var currentPointIndex = 0; // 当前车辆所在坐标点的索引

            map.addSource(markerSource, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [115.40898201876581, 33.87783725151401]
                        }
                    }]
                }
            });

            // 创建图层
            map.addLayer({
                id: 'marker-layer',
                type: 'circle',
                source: markerSource,
                paint: {
                    'circle-radius': 8,
                    'circle-color': 'red'
                }
            });

            function animateMarker(callback) {
                if (currentPointIndex < lineCoordinates.length - 1) {
                    currentPointIndex++;
                    // 更新图层的数据
                    map.getSource(markerSource).setData({
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: lineCoordinates[currentPointIndex]
                            }
                        }]
                    });

                    console.log(312321412321);

                    setTimeout(() => animateMarker(callback), 30); // 每隔1秒更新车辆
                    // map.setCenter(lineCoordinates[currentPointIndex]);


                    map.easeTo({
                        center: lineCoordinates[currentPointIndex],
                        duration: 1000 // 过渡时间，单位为毫秒
                    });
                } else {
                    callback();
                }

            }
            animateMarker(function () {
                // 在动画执行完毕后执行的回调函数
                console.log('Animation finished!');
                map.removeSource('lineSource'); // 删除线的源
                map.removeLayer('subway-layer'); // 删除线的图层

                map.removeSource('markerSource'); // 删除线的源
                map.removeLayer('marker-layer'); // 删除线的图层
            });
        }
    }

    const xiezai = () => {
        if (map) {
            map.removeSource('lineSource'); // 删除线的源
            map.removeLayer('subway-layer'); // 删除线的图层

            map.removeSource('markerSource'); // 删除线的源
            map.removeLayer('marker-layer'); // 删除线的图层
        }
    }
    return (
        <>
            {/* {markers} */}
            {musicMarkers}
            {properties && (
                <Popup
                    anchor="left"
                    longitude={properties.longitude}
                    latitude={properties.latitude}
                    closeButton={false}
                    closeOnClick={false}
                    maxWidth={'100%'}
                >

                    {/* <div className={styles.center}>
                        <iframe allowFullScreen={true} width="650px" height="365px" src="//player.bilibili.com/player.html?aid=388536308&bvid=BV1xd4y1q7c7&cid=846169013&page=1&danmaku=0&high_quality=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
                    </div> */}
                    <button onClick={click}>321</button>
                    <button onClick={xiezai}>卸载</button>
                </Popup>
            )}
        </>
    )
};
function mapStateToProps({ houchenModel }: any) {
    return {
        viewState: houchenModel.viewState,
        map: houchenModel.map,
    }
}
export default connect(mapStateToProps)(Index);
