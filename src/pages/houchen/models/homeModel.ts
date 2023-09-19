import { HouchenModelType } from '@/interface/houchen/map'

const houchenModel: HouchenModelType = {
    namespace: 'houchenModel',
    state: {
        menu: '首页',
        map: null,
        viewState: {
            zoom: 13,
            pitch: 0,
            longitude: 115.4109739,
            latitude: 33.8762738,
            minZoom: 11,
            maxZoom: 19,
            bearing: 7.2

        },
        popupInfo: null,
        toolBar: []

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
    },
};

export default houchenModel;
