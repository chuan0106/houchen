import mapstyle from '../../../public/mapstyle/mapstyles.json'
const INITIAL_VIEW_STATE = {
    altitude: 1.5,
    bearing: -13.071753421384551,
    height: 1080,
    latitude: 29.813937905958735,
    longitude: 114.99761789082964,
    maxPitch: 60,
    maxZoom: 28,
    minPitch: 0,
    minZoom: 0,
    pitch: 42.19170172749507,
    width: 3520,
    zoom: 10.018099209327202,
};

//地图的密钥
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2h1YW4wMTA2IiwiYSI6ImNrc3UzaHM0NDFjbTMydm1kaG1vaW1tN3YifQ.vMtkKlcWXantTp1p1Z6N3g'; // Set your mapbox token here
//地图样式
const MAP_STYLE = mapstyle;
// const MAP_STYLE = "../mapstyle/mapstyles.json";

export {
    INITIAL_VIEW_STATE,
    MAPBOX_TOKEN,
    MAP_STYLE
};
