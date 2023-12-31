import proj4 from 'proj4';
import { FeatureCollection } from '@/interface/houchen/map'
import * as home from './home.json';
import * as houchen from './houchen.json';
import * as luyi from './luyi.json'
import * as tx_luyi from './tx_luyi.json'
import * as tx_bozhou from './tx_bozhou.json'
import * as tx_zhengzhou from './tx_zhengzhou.json'
import * as tx_kaifeng from './tx_kaifeng.json'
import * as tx_luoyang from './tx_luoyang.json'
import * as tx_pingdingshan from './tx_pingdingshan.json'
import * as tx_anyang from './tx_anyang.json'
import * as tx_hebi from './tx_hebi.json'
import * as tx_xinxiang from './tx_xinxiang.json'
import * as tx_jiaozuo from './tx_jiaozuo.json'
import * as tx_puyang from './tx_puyang.json'
import * as tx_xuchang from './tx_xuchang.json'
import * as tx_luohe from './tx_luohe.json'
import * as tx_sanmenxia from './tx_sanmenxia.json'
import * as tx_nanyang from './tx_nanyang.json'
import * as tx_shangqiu from './tx_shangqiu.json'
import * as tx_xinyang from './tx_xinyang.json'
import * as tx_zhoukou from './tx_zhoukou.json'
import * as tx_zhumadian from './tx_zhumadian.json'

// 周口市 start ~
// 县(7个)
import tx_taikang from './zhoukou_json/tx_taikang.json'
import tx_dancheng from './zhoukou_json/tx_dancheng.json'
import tx_shenqiu from './zhoukou_json/tx_shenqiu.json'
import tx_shangshuixian from './zhoukou_json/tx_shangshuixian.json'
import tx_xihua from './zhoukou_json/tx_xihua.json'
import tx_fugou from './zhoukou_json/tx_fugou.json'
// 市辖区(2个)
import tx_chuanhuiqu from './zhoukou_json/tx_chuanhuiqu.json'
import tx_huaiyangqu from './zhoukou_json/tx_huaiyangqu.json'
// 县级市(1个)
import tx_xiangchengshi from './zhoukou_json/tx_xiangchengshi.json'
// 周口市 end ~

// 定义 GeoJSON 类型
// interface GeoJson {
//     type: string;
//     geometry: {
//         type: string;
//         coordinates: number[][][]; // 根据实际情况调整
//     };
//     properties: Record<string, any>;
// }
interface GeoJson {
    type: any;
    geometry: {
        type: any;
        coordinates: number[][][]; // 根据实际情况调整
    };
    properties: Record<string, any>;
}

const homeData: FeatureCollection = home as FeatureCollection;
const houchenData: FeatureCollection = houchen as FeatureCollection;

const processCoordinateString = (coordinateString: string): GeoJson => {
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
    const geoJson: GeoJson = {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [
                facesData
            ]
        },
        properties: {} // 直接定义属性对象
    };
    return geoJson;
};




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

const zhengzhou = processCoordinateString(tx_zhengzhou.detail.brief.area);
const kaifeng = processCoordinateString(tx_kaifeng.detail.brief.area);
const luoyang = processCoordinateString(tx_luoyang.detail.brief.area);
const pingdingshan = processCoordinateString(tx_pingdingshan.detail.brief.area);
const anyang = processCoordinateString(tx_anyang.detail.brief.area);
const hebi = processCoordinateString(tx_hebi.detail.brief.area);
const xinxiang = processCoordinateString(tx_xinxiang.detail.brief.area);
const jiaozuo = processCoordinateString(tx_jiaozuo.detail.brief.area);
const puyang = processCoordinateString(tx_puyang.detail.brief.area);
const xuchang = processCoordinateString(tx_xuchang.detail.brief.area);
const luohe = processCoordinateString(tx_luohe.detail.brief.area);
const sanmenxia = processCoordinateString(tx_sanmenxia.detail.brief.area);
const nanyanga = processCoordinateString(tx_nanyang.detail.brief.area);
const shangqiu = processCoordinateString(tx_shangqiu.detail.brief.area);
const xinyang = processCoordinateString(tx_xinyang.detail.brief.area);
const zhoukou = processCoordinateString(tx_zhoukou.detail.brief.area);
const zhumadian = processCoordinateString(tx_zhumadian.detail.brief.area);

const taikang = processCoordinateString(tx_taikang.detail.brief.area);
const dancheng = processCoordinateString(tx_dancheng.detail.brief.area);
const shenqiu = processCoordinateString(tx_shenqiu.detail.brief.area);
const shangshui = processCoordinateString(tx_shangshuixian.detail.brief.area);
const xihua = processCoordinateString(tx_xihua.detail.brief.area);
const fugou = processCoordinateString(tx_fugou.detail.brief.area);
const chuanhuiqu = processCoordinateString(tx_chuanhuiqu.detail.brief.area);
const huaiyangqu = processCoordinateString(tx_huaiyangqu.detail.brief.area);
const xiangchengshi = processCoordinateString(tx_xiangchengshi.detail.brief.area);
const bozhouData = processCoordinateString(tx_bozhou.detail.brief.area);

const henansheng = [
    {
        name: '郑州', id: 'zhengzhou_layer', data: zhengzhou, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [113.46682338991832, 34.68839572261018],
            zoom: 9
        }
    },
    {
        name: '开封', id: 'kaifeng_layer', data: kaifeng, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [114.55393388126276, 34.66394047416766],
            zoom: 9
        }
    },
    {
        name: '洛阳', id: 'luoyang_layer', data: luoyang, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [111.99587395537645, 34.3617955899318],
            zoom: 8.5
        }
    },
    {
        name: '平顶山', id: 'pingdingshan_layer', data: pingdingshan, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [112.9146279787056, 33.81320067741066],
            zoom: 8.7
        }
    },
    {
        name: '安阳', id: 'anyang_layer', data: anyang, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [114.37629827024506, 35.840881170468634],
            zoom: 8.7
        }
    },
    {
        name: '鹤壁', id: 'hebi_layer', data: hebi, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [114.29684845688479, 35.7849689544956],
            zoom: 9.8
        }
    },
    {
        name: '新乡', id: 'xinxiang_layer', data: xinxiang, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [114.1651165691016, 35.39510041653989],
            zoom: 8.7
        }
    },
    {
        name: '焦作', id: 'jiaozuo_layer', data: jiaozuo, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [113.06473392557746, 35.17478901411562],
            zoom: 9.4
        }
    },
    {
        name: '濮阳', id: 'puyang_layer', data: puyang, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [115.44576795625477, 35.84819940771493],
            zoom: 9
        }
    },
    {
        name: '许昌', id: 'xuchang_layer', data: xuchang, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [113.71794126766719, 34.116230066287486],
            zoom: 9
        }
    },
    {
        name: '漯河', id: 'luohe_layer', data: luohe, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [113.86599094078667, 33.715901163639046],
            zoom: 9.4
        }
    },
    {
        name: '三门峡', id: 'sanmenxia_layer', data: sanmenxia, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [111.16629744568644, 34.4434301299997],
            zoom: 8.3
        }
    },
    {
        name: '南阳', id: 'nanyang_layer', data: nanyanga, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [112.23662949178731, 33.138285561332395],
            zoom: 8
        }
    },
    {
        name: '商丘', id: 'shangqiu_layer', data: shangqiu, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [115.72189343505153, 34.35256141299722],
            zoom: 8.7
        }
    },
    {
        name: '信阳', id: 'xinyang_layer', data: xinyang, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [114.89171759778804, 32.14578161887991],
            zoom: 8.3
        }
    },
    {
        name: '周口市', id: 'zhoukou_layer', data: zhoukou, color: '0, 100, 252', outline_color: '#0064fc',
        location: {
            center: [114.87004627497936, 33.72063809386941],
            zoom: 8.7
        }
    },
    {
        name: '驻马店', id: 'zhumadian_layer', data: zhumadian, color: '22, 97, 171', outline_color: '#0064fc',
        location: {
            center: [114.19754910242978, 32.99365380158558],
            zoom: 8.6
        }
    },
]

const zhoukoushi = [
    {
        name: '鹿邑县', id: 'luyi_layer', data: luyiData, color: '0, 100, 252', outline_color: '#0064fc', location: {
            center: [115.36715645278235, 33.91635427494431],
            zoom: 10
        }
    },
    {
        name: '太康县', id: 'taikang_layer', data: taikang, color: '230, 179, 180', outline_color: '#0064fc', location: {
            center: [114.8376398131183, 34.107017313666375],
            zoom: 10
        }
    },
    {
        name: '郸城县', id: 'dancheng_layer', data: dancheng, color: '230, 179, 180', outline_color: '#0064fc', location: {
            center: [115.30803538294424, 33.65768478619064],
            zoom: 10
        }
    },
    {
        name: '沈丘县', id: 'shenqiu_layer', data: shenqiu, color: '230, 179, 180', outline_color: '#0064fc', location: {
            center: [115.15076804023761, 33.32562675031549],
            zoom: 10
        }
    },
    {
        name: '商水县', id: 'shangshui_layer', data: shangshui, color: '230, 179, 180', outline_color: '#0064fc', location: {
            center: [114.50614740287568, 33.52591678688876],
            zoom: 10
        }
    },
    {
        name: '西华县', id: 'xihua_layer', data: xihua, color: '230, 179, 180', outline_color: '#0064fc', location: {
            center: [114.49080058163275, 33.81429179743664],
            zoom: 10
        }
    },
    {
        name: '扶沟县', id: 'fugou_layer', data: fugou, color: '230, 179, 180', outline_color: '#0064fc', location: {
            center: [114.38668132313171, 34.11574330471109],
            zoom: 10
        }
    },
    {
        name: '川汇区', id: 'chuanhuiqu_layer', data: chuanhuiqu, color: '230, 179, 180', outline_color: '#0064fc', location: {
            center: [114.64202, 33.625607],
            zoom: 10
        }
    },
    {
        name: '淮阳区', id: 'huaiyangqu_layer', data: huaiyangqu, color: '230, 179, 180', outline_color: '#0064fc', location: {
            center: [114.88867698565201, 33.686832316425736],
            zoom: 10
        }
    },
    {
        name: '项城市', id: 'xiangchengshi_layer', data: xiangchengshi, color: '230, 179, 180', outline_color: '#0064fc', location: {
            center: [114.92427842523114, 33.290915825005015],
            zoom: 10
        }
    },
]

export { homeData, houchenData, luyiData, bozhouData, henansheng, zhoukoushi };