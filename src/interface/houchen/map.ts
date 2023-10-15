import { Effect, Reducer } from 'umi';

export declare type PaddingOptions = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
export interface FilterOptions {
    /**
     * Whether to check if the filter conforms to the Mapbox GL Style Specification.
     * Disabling validation is a performance optimization that should only be used
     * if you have previously validated the values you will be passing to this function.
     */
    validate?: boolean | null | undefined;
}
export interface MapInstanceType {
    setPaintProperty(layer: string, name: string, value: any, options?: FilterOptions): this;
    // 其他地图实例的属性和方法
    // 这里添加地图实例的属性和方法
    // 例如：
    // zoom: number;
    // setZoom: (zoom: number) => void;
    // ...
}
export interface viewStateType {
    longitude: number;
    latitude: number;
    zoom: number;
    bearing: number;
    pitch: number;
    minZoom: number;
    maxZoom: number;
    padding?: PaddingOptions;
}

export interface StateType {
    menu: string;
    map: MapInstanceType | null;
    viewState: viewStateType;
    popupInfo: null;
    toolBar: string[];
    layerActive: null;
    mapTheme: string;
    mapCity: string;
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
        setToolBar: Reducer<StateType>,
        setLayerActive: Reducer<StateType>,
        setMapTheme: Reducer<StateType>,
        setMapCity: Reducer<StateType>,
    };
}

// model end~

// geojson start~
export interface MarkerProperties {
    match?: string;
    city: string;
    id: number;
    population: string;
    image: string;
    state: string;
    latitude: number;
    longitude: number;
    zoom?: number;
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









