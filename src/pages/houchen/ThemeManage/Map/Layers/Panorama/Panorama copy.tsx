import { useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Source, Layer, MapRef, LngLatLike } from 'react-map-gl';
import type { viewStateType } from '@/interface/houchen/map'
import type { toolBarType } from '@/interface/houchen'

import { luyiData, citysData, zhoukouData } from '@/pages/data/map'

type MapMarkersType = {
    onMarkerClick: Function;
    mapInfo: MapRef;
    viewState: viewStateType;
    menu: string;
    toolBar: toolBarType;
    layerActive: string;
    mapCity: string;
}

function MapMarkers({ mapInfo, layerActive, mapCity }: MapMarkersType) {
    console.log({ layerActive });

    useEffect(() => {
        const center: {
            zoom: number;
            center?: LngLatLike; // 修改这里的类型
            bearing?: number;
            padding?: {
                top: number;
                bottom: number;
                left: number;
                right: number;
            };
            pitch?: number;
        } = {
            zoom: 8.8,
            center: [114.84360034784646, 33.747950035853165],
            bearing: 0,
        }

        mapCity === '周口' && mapInfo.getMap().easeTo(center);
    }, [mapCity])  // 检测数组内变量 如果为空 则监控全局
    const luyi_markers = useMemo(() => (
        <Source id="鹿邑" type="geojson" data={luyiData}>
            <Layer
                id="luyi-layer"
                type="fill"
                paint={{
                    'fill-color': 'rgba(0, 100, 252,.5)',
                    'fill-opacity': 0.6,
                    'fill-outline-color': '#0064fc', // 边的颜色
                }}
            />
        </Source>
    ), [luyiData])

    const zhoukou_markers = useMemo(() => {
        return <Source id="周口" type="geojson" data={zhoukouData}>
            <Layer
                id="bozhou-layer"
                type="fill"
                paint={{
                    'fill-color': 'rgba(0, 100, 252,.5)',
                    'fill-opacity': 0.6,
                    'fill-outline-color': '#0064fc', // 边的颜色
                }}
            />
        </Source>
    }, [zhoukouData])


    const citys = useMemo(() => {
        return citysData.map((layer, i) => (
            <Source key={`${layer.id}${i}`} id={layer.name} type="geojson" data={layer.data}>
                <Layer
                    id={`${layer.id}`}
                    type="fill"
                    paint={{
                        'fill-color': `rgba(${layer.color},${layerActive === layer.id ? 1 : 0.6})`,
                        'fill-opacity': 0.6,
                        'fill-outline-color': layer.outline_color, // 边的颜色
                    }}
                />
            </Source>
        ))
    }, [citysData, layerActive])

    return (
        <>
            {mapCity === '河南省' && citys}
            {mapCity === '周口' && zhoukou_markers}
            {mapCity === '鹿邑' && luyi_markers}
        </>
    )
}
function mapStateToProps({ houchenModel }: any) {
    return {
        layerActive: houchenModel.layerActive,
        mapCity: houchenModel.mapCity
    }
}
export default connect(mapStateToProps)(MapMarkers);