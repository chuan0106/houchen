import { FC, useEffect, useRef, createRef, useCallback } from 'react';
import { useDispatch } from 'umi';
import { connect } from 'dva';
import mapboxgl, { Map, LayerProps, Marker, Popup, MapRef, MapLayerMouseEvent, MapMouseEvent } from 'react-map-gl';
import { viewStateType, MarkerProperties } from '@/interface/houchen/map'
// import BaseLayer from './lib/baseLayer/baseLayer';
import 'mapbox-gl/dist/mapbox-gl.css';
import { throttle } from '@/utils/js/methods'
import { MAPBOX_TOKEN } from '@/utils/publickPage'
import Layers from './Layers'
import Message from './Message'
export const clusterLayer: LayerProps = {
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
    }
};

export const clusterCountLayer: LayerProps = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
};

export const unclusteredPointLayer: LayerProps = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
    }
};

type props = {
    viewState: viewStateType;
    popupInfo: MarkerProperties;
    mapTheme: string
}

const App: FC<props> = ({ viewState, popupInfo, mapTheme }) => {
    const dispatch = useDispatch();
    const mapRef = createRef<MapRef>();

    const initMapCallback: any = (even: MapLayerMouseEvent) => {
        const map = even?.target
        if (map) {
            dispatch({
                type: 'houchenModel/setMap',
                payload: map
            });

            map.on('click', (event: MapLayerMouseEvent) => {
                const features = map.queryRenderedFeatures(event.point);
                console.log(features, 'features');

            })

            // 当鼠标移入地图时触发
            const throttledMouseMove = throttle((event) => {
                console.log(event, 'eventevent');

                let lastHoveredLayerId = null;
                const features = map.queryRenderedFeatures(event.point);

                // 如果没有找到任何特性，清除上次的悬停状态并退出
                if (!features.length) {
                    if (lastHoveredLayerId) {
                        lastHoveredLayerId = null;
                    }
                    // console.log('没找到任何线索', 222222222, lastHoveredLayerId);
                    dispatch({
                        type: 'houchenModel/setLayerActive',
                        payload: null
                    });
                    return;
                }

                // 获取当前悬停的图层ID
                const currentHoveredLayerId = features[0].layer.id;

                // 如果当前悬停的图层ID与上次的不同，则打印并更新lastHoveredLayerId
                if (lastHoveredLayerId !== currentHoveredLayerId) {
                    console.log(`鼠标现在悬停在图层：${currentHoveredLayerId}`, lastHoveredLayerId);
                    lastHoveredLayerId = currentHoveredLayerId;
                    dispatch({
                        type: 'houchenModel/setLayerActive',
                        payload: currentHoveredLayerId
                    });
                }
            }, 20);
            map.on('mousemove', throttledMouseMove);
        }
    }

    // 弹窗
    const markerHandler = (city: any) => {
        // setPopupInfo(city);
        dispatch({
            type: 'houchenModel/setPopupInfo',
            payload: city
        });
    }
    // 得到面图层的 source
    const getFaceLayerSource = (sourceId: string) => {
        console.log({ sourceId });
        dispatch({
            type: 'houchenModel/setMapCity',
            payload: sourceId
        });
    }

    const mapHandlerClick = (event: MapMouseEvent) => {
        // const map = event?.target as mapboxgl.Map;
        const map = event?.target;
        const { point } = event;
        console.log(event, 'dsalkjdsa');

        const features = map.queryRenderedFeatures(point);
        const filteredFeatures = features.filter(feature => feature.source !== 'composite');
        const sourceId = filteredFeatures.length > 0 && filteredFeatures[0].source
        if (sourceId) {
            getFaceLayerSource(sourceId)
        }
    };


    const onMove = useCallback(({ viewState }: any) => {
        console.log({ viewState });
        dispatch({
            type: 'houchenModel/setViewState',
            payload: viewState
        });
    }, [])

    return (
        <>
            <Map
                // {...viewState}
                initialViewState={viewState}
                ref={mapRef}
                language={'zh-Hans'}
                onMove={onMove}
                onLoad={initMapCallback}
                mapStyle={`/mapstyle/style.json`}
                styleDiffing
                mapboxAccessToken={MAPBOX_TOKEN}
                onClick={mapHandlerClick}
            >
                <Layers mapRef={mapRef} onMarkerClick={markerHandler} />
                {popupInfo && (
                    <Popup
                        anchor="left"
                        longitude={Number(popupInfo?.longitude)}
                        latitude={Number(popupInfo?.latitude)}
                        closeButton={false}
                        closeOnClick={false}
                        maxWidth={'100%'}
                    >
                        <div style={{ width: '335px', height: '100%' }}>
                            <Message message={popupInfo} title='详情' />
                        </div>
                    </Popup>
                )}
            </Map>
        </>
    );
}

function mapStateToProps({ houchenModel }: any) {
    return {
        viewState: houchenModel.viewState,
        popupInfo: houchenModel.popupInfo,
        mapTheme: houchenModel.mapTheme,
    }
}
export default connect(mapStateToProps)(App);