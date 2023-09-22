import proj4 from 'proj4';

import { FeatureCollection } from '@/interface/houchen/map'
import * as home from './home.json';
import * as houchen from './houchen.json';
import * as luyi from './luyi.json'
import * as tx_luyi from './tx_luyi.json'
import tx_bozhou from './tx_bozhou.json'

const homeData: FeatureCollection = home as FeatureCollection;
const houchenData: FeatureCollection = houchen as FeatureCollection;

const luyiData: any = (() => {
    // 百度数据
    const bd_luyiData = (() => {
        proj4.defs("EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
        proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");

        // const coordinateString = luyi.content.ext.detail_info.guoke_geo.geo;
        const coordinateString = luyi.result.profile_region;

        // 将逗号分隔的坐标字符串拆分成坐标对
        const coordinates = coordinateString.split(',');

        // 存储转换后的经纬度坐标
        let facesData = [];
        // 将每个坐标对转换为经纬度坐标并存储在数组中
        for (let i = 0; i < coordinates.length; i += 2) {
            const x = parseFloat(coordinates[i]);
            const y = parseFloat(coordinates[i + 1]);
            const longitude_latitude = [x, y]
            console.log(longitude_latitude, 'longitude_latitude');

            const convertedCoordinates = proj4("EPSG:3857", "EPSG:4326", longitude_latitude);
            facesData.push(convertedCoordinates);
        }
        console.log(facesData, 'facesData');

        const geoJson = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    facesData
                ],
                properties: {
                    // 其他属性
                }
            },
        };
        return geoJson;
    })();

    // 腾讯数据
    const tx_luyiData = (() => {
        // 原始字符串
        const coordinateString = tx_luyi.detail.brief.area
        // 去掉括号和分号，并将坐标对拆分成数组
        const coordinatePairs = coordinateString
            .replace(/[()]/g, '') // 去掉括号
            .split(';') // 按分号拆分成坐标对
        let facesData: number[][] = [];
        // 解析每个坐标对，并存储为经度和纬度的数组
        coordinatePairs.map(pair => {
            const [lng, lat] = pair.split(',').map(parseFloat);
            facesData.push([lng, lat])
        });
        const geoJson = {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    facesData
                ],
                properties: {
                    // 其他属性
                }
            },
        };
        return geoJson;
    })();
    const type = 1
    return type === 1 ? tx_luyiData : bd_luyiData
}
)()

const bozhouData: any = (() => {
    // 原始字符串
    const coordinateString = tx_bozhou.detail.brief.area
    // 去掉括号和分号，并将坐标对拆分成数组
    const coordinatePairs = coordinateString
        .replace(/[()]/g, '') // 去掉括号
        .split(';') // 按分号拆分成坐标对
    let facesData: number[][] = [];
    // 解析每个坐标对，并存储为经度和纬度的数组
    coordinatePairs.map(pair => {
        const [lng, lat] = pair.split(',').map(parseFloat);
        facesData.push([lng, lat])
    });
    const geoJson = {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [
                facesData
            ],
            properties: {
                // 其他属性
            }
        },
    };
    return geoJson;
})()


const citysData = [
    { name: '鹿邑县', id: 'luyi_layer', data: luyiData, color: '230, 179, 180', outline_color: '#0064fc' },
    { name: '亳州市', id: 'bozhou_layer', data: bozhouData, color: '0, 100, 252', outline_color: '#0064fc' },
]
export { homeData, houchenData, luyiData, bozhouData, citysData };