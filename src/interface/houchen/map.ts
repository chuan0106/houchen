import { Effect, Reducer } from 'umi';
// model start~
export interface viewStateType {
    zoom: number;
    pitch: number;
    longitude: number;
    latitude: number;
    minZoom: number;
    maxZoom: number;
}

export interface StateType {
    menu: string,
    map: null,
    viewState: viewStateType,
    popupInfo: null
}

export interface HouchenModelType {
    namespace: 'houchenModel';
    state: StateType;
    effects: {
        fetch: Effect;
    };
    reducers: {
        setMenu: Reducer<StateType>,
        setMap: Reducer<StateType>,
        setViewState: Reducer<StateType>,
        setPopupInfo: Reducer<StateType>,
    };
}

// model end~

// geojson start~
export interface MarkerProperties {
    city: string;
    id: number;
    population: string;
    image: string;
    state: string;
    latitude: number;
    longitude: number;
    zoom?: number; // zoom 是可选的字段
};

export interface MarkerGeometry {
    coordinates: [number, number];
    type: string;
};

export interface MarkerFeature {
    type: string;
    properties: MarkerProperties;
    geometry: MarkerGeometry;
};

export interface FeatureCollection {
    type: string;
    features: MarkerFeature[];
};

// geojson end~

export interface dispatchType {
    type: string;
    payload: Record<string, any>;
}