import { useState, useEffect } from 'react';
import { connect } from 'dva';
import { MapRef, LngLatLike } from 'react-map-gl';
import type { viewStateType } from '@/interface/houchen/map';
import type { toolBarType } from '@/interface/houchen';

import Henansheng from './Henansheng'
import Zhoukoushi from './Zhoukoushi'
import Luyixian from './Luyixian'

type CenterType = {
    zoom: number;
    center?: LngLatLike;
    bearing?: number;
    padding?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    pitch?: number;
};

type MapMarkersType = {
    onMarkerClick: Function;
    mapInfo: MapRef;
    viewState: viewStateType;
    menu: string;
    toolBar: toolBarType;
    layerActive: string;
    mapCity: string;
};

function MapMarkers({ mapInfo, layerActive, mapCity }: MapMarkersType) {
    const [childComponent, setChildComponent] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const mapElement: { [key: string]: () => JSX.Element } = {
            '河南省': () => {
                const center: CenterType = {
                    center: [113.55795426467324, 34.109682102772766],
                    bearing: 0,
                    pitch: 0,
                    zoom: 6.84
                }
                mapInfo.getMap().easeTo(center);
                return <Henansheng layerActive={layerActive} />; // 传递 layerActive 到 Henansheng 组件
            },
            '周口市': () => {
                const center: CenterType = {
                    zoom: 8.8,
                    center: [114.85318060144147, 33.75852824595435],
                    bearing: 0,
                };
                mapInfo.getMap().easeTo(center);
                return <Zhoukoushi />;
            },
            '鹿邑县': () => {
                const center: CenterType = {
                    zoom: 10,
                    center: [115.37047769570387, 33.92696994350284],
                    bearing: 0,
                };
                mapInfo.getMap().easeTo(center);
                return <Luyixian />;
            },
        };

        if (mapElement[mapCity]) {
            const component = mapElement[mapCity]();
            setChildComponent(component);
        }
    }, [mapCity]);

    return <>{childComponent}</>;
}

function mapStateToProps({ houchenModel }: any) {
    return {
        layerActive: houchenModel.layerActive,
        mapCity: houchenModel.mapCity,
    };
}

export default connect(mapStateToProps)(MapMarkers);