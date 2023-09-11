import { Effect, Reducer } from 'umi';

export interface StateType {
    // 定义 model 的 state 类型
    menu: string,
    map: null,
    viewState: any
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
    };
}

const houchenModel: HouchenModelType = {
    namespace: 'houchenModel',
    state: {
        menu: '首页',
        map: null,
        viewState: {
            zoom: 13,
            pitch: 62,
            longitude: 115.4109739,
            latitude: 33.8762738,
            minZoom: 12,
            maxZoom: 19,
        }
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            // 处理异步逻辑
        },
    },
    reducers: {
        setMenu(state, { payload }) {
            // 处理同步逻辑并更新 state
            state.menu = payload
            return {
                ...state,
            };
        },
        setMap(state, { payload }) {
            // 处理同步逻辑并更新 state
            console.log(payload);

            state.map = payload
            return {
                ...state,
            };
        },
        setViewState(state, { payload }) {
            // 处理同步逻辑并更新 state
            console.log(payload);

            state.viewState = payload
            return {
                ...state,
            };
        },

    },
};

export default houchenModel;
