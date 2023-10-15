import { HouchenModelType } from '@/interface/houchen/map'

const houchenModel: HouchenModelType = {
    namespace: 'houchenModel',
    state: {
        menu: '首页', // 模块
        map: null, // 地图
        viewState: {  // 地图位置
            zoom: 13,
            pitch: 0,
            longitude: 115.4109739,
            latitude: 33.8762738,
            minZoom: 6.84,
            maxZoom: 19,
            bearing: 7.2
        },
        popupInfo: null, // 弹窗
        toolBar: [], // 工具栏
        layerActive: null, // 活跃的图层
        mapTheme: 'rgba(240, 248, 255,1)', // 主题地块颜色
        mapCity: '河南省' // 地图下攥

    },
    effects: {
        *fetch({ payload }, { call, put }) {
            // 处理异步逻辑
        },
    },
    reducers: {
        setMenu(state, { payload }) {
            return {
                ...state,
                menu: payload
            };
        },
        setMap(state, { payload }) {
            return {
                ...state,
                map: payload
            };
        },
        setViewState(state, { payload }) {
            return {
                ...state,
                viewState: payload
            };
        },
        setPopupInfo(state, { payload }) {
            return {
                ...state,
                popupInfo: payload
            };
        },
        setToolBar(state, { payload }) {
            return {
                ...state,
                toolBar: payload
            };
        },
        setLayerActive(state, { payload }) {
            return {
                ...state,
                layerActive: payload
            };
        },
        setMapTheme(state, { payload }) {
            return {
                ...state,
                mapTheme: payload
            };
        },
        setMapCity(state, { payload }) {
            return {
                ...state,
                mapCity: payload
            };
        },
    },
};

export default houchenModel;
