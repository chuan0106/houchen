import { FC, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'umi';
import { connect } from 'dva';
import { Map, LayerProps, Marker, Popup, MapRef, MapLayerMouseEvent } from 'react-map-gl';
import { viewStateType, MarkerProperties } from '@/interface/houchen/map'
// import BaseLayer from './lib/baseLayer/baseLayer';
import 'mapbox-gl/dist/mapbox-gl.css';
import { throttle } from '@/utils/js/methods'
import ControlPanel from './control-panel';
import Layers from './Layers'
import Message from './Message'
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2h1YW4wMTA2IiwiYSI6ImNrc3UzaHM0NDFjbTMydm1kaG1vaW1tN3YifQ.vMtkKlcWXantTp1p1Z6N3g'; // Set your mapbox token here

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
}

const App: FC<props> = ({ viewState, popupInfo }) => {
    const dispatch = useDispatch();
    const mapRef = useRef<MapRef>(null);

    const initMapCallback: any = (even: MapLayerMouseEvent) => {

        const map = even?.target
        if (map) {
            dispatch({
                type: 'houchenModel/setMap',
                payload: map
            });
            map.on('click', (e: MapLayerMouseEvent) => {
                console.log(e);
            })

            // 当鼠标移入地图时触发
            const throttledMouseMove = throttle((event) => {
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
                    console.log(`鼠标现在悬停在图层：${currentHoveredLayerId}`);
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

    const onClick = (event: MapLayerMouseEvent) => {
    };

    const onMove = useCallback(({ viewState }: any) => {
        dispatch({
            type: 'houchenModel/setViewState',
            payload: viewState
        });
    }, [])

    return (
        <>
            <Map
                {...viewState}
                ref={mapRef}
                // viewState={viewState}
                // initialViewState={viewState}
                // onMove={evt => setViewState(evt.viewState)}
                onMove={onMove}
                onLoad={initMapCallback}
                // mapStyle={mapStyle && mapStyle.toJS()}
                mapStyle={'mapbox://styles/mapbox/streets-v11'}
                styleDiffing
                mapboxAccessToken={MAPBOX_TOKEN}
                onClick={onClick}
            >
                <Layers
                    mapRef={mapRef}
                    onMarkerClick={markerHandler}
                />
                {/* {pins} */}
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
                            {/* {popupInfo?.name} {popupInfo?.property} */}
                            <Message message={popupInfo} title='详情' />
                        </div>
                    </Popup>
                )}
            </Map>

            {/* <ControlPanel onChange={setMapStyle} /> */}
        </>
    );
}

function mapStateToProps({ houchenModel }: any) {
    return {
        viewState: houchenModel.viewState,
        popupInfo: houchenModel.popupInfo,

    }
}
export default connect(mapStateToProps)(App);