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

const zhengzhouData: any = (() => {
    // 原始字符串
    const coordinateString = tx_zhengzhou.detail.brief.area
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

const kaifengData: any = (() => {
    // 原始字符串
    const coordinateString = tx_kaifeng.detail.brief.area
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

const luoyangData: any = (() => {
    // 原始字符串
    const coordinateString = tx_luoyang.detail.brief.area
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

const pingdingshanData: any = (() => {
    // 原始字符串
    const coordinateString = tx_pingdingshan.detail.brief.area
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

const anyangData: any = (() => {
    // 原始字符串
    const coordinateString = tx_anyang.detail.brief.area
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

const hebiData: any = (() => {
    // 原始字符串
    const coordinateString = tx_hebi.detail.brief.area
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

const xinxiangData: any = (() => {
    // 原始字符串
    const coordinateString = tx_xinxiang.detail.brief.area
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

const jiaozuoData: any = (() => {
    // 原始字符串
    const coordinateString = tx_jiaozuo.detail.brief.area
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

const puyangData: any = (() => {
    // 原始字符串
    const coordinateString = tx_puyang.detail.brief.area
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

const xuchangData: any = (() => {
    // 原始字符串
    const coordinateString = tx_xuchang.detail.brief.area
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

const luoheData: any = (() => {
    // 原始字符串
    const coordinateString = tx_luohe.detail.brief.area
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

const sanmenxiaData: any = (() => {
    // 原始字符串
    const coordinateString = tx_sanmenxia.detail.brief.area
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

const nanyangaData: any = (() => {
    // 原始字符串
    const coordinateString = tx_nanyang.detail.brief.area
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

const shangqiuData: any = (() => {
    // 原始字符串
    const coordinateString = tx_shangqiu.detail.brief.area
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

const xinyangData: any = (() => {
    // 原始字符串
    const coordinateString = tx_xinyang.detail.brief.area
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

export const zhoukouData: any = (() => {
    // 原始字符串
    const coordinateString = tx_zhoukou.detail.brief.area
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

const zhumadianData: any = (() => {
    // 原始字符串
    const coordinateString = tx_zhumadian.detail.brief.area
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

const taikangData: any = (() => {
    // 原始字符串
    const coordinateString = tx_taikang.detail.brief.area
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
const danchengData: any = (() => {
    // 原始字符串
    const coordinateString = tx_dancheng.detail.brief.area
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
const shenqiuData: any = (() => {
    // 原始字符串
    const coordinateString = tx_shenqiu.detail.brief.area
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

const shangshuiData: any = (() => {
    // 原始字符串
    const coordinateString = tx_shangshuixian.detail.brief.area
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

const xihuaData: any = (() => {
    // 原始字符串
    const coordinateString = tx_xihua.detail.brief.area
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

const fugouData: any = (() => {
    // 原始字符串
    const coordinateString = tx_fugou.detail.brief.area
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

const chuanhuiquData: any = (() => {
    // 原始字符串
    const coordinateString = tx_chuanhuiqu.detail.brief.area
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

const huaiyangquData: any = (() => {
    // 原始字符串
    const coordinateString = tx_huaiyangqu.detail.brief.area
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

const xiangchengshiData: any = (() => {
    // 原始字符串
    const coordinateString = tx_xiangchengshi.detail.brief.area
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

const henanshengData = [
    // { name: '鹿邑县', id: 'luyi_layer', data: luyiData, color: '230, 179, 180', outline_color: '#0064fc' },
    // { name: '亳州市', id: 'bozhou_layer', data: bozhouData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '郑州', id: 'zhengzhou_layer', data: zhengzhouData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '开封', id: 'kaifeng_layer', data: kaifengData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '洛阳', id: 'luoyang_layer', data: luoyangData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '平顶山', id: 'pingdingshan_layer', data: pingdingshanData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '安阳', id: 'anyang_layer', data: anyangData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '鹤壁', id: 'hebi_layer', data: hebiData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '新乡', id: 'xinxiang_layer', data: xinxiangData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '焦作', id: 'jiaozuo_layer', data: jiaozuoData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '濮阳', id: 'puyang_layer', data: puyangData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '许昌', id: 'xuchang_layer', data: xuchangData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '漯河', id: 'luohe_layer', data: luoheData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '三门峡', id: 'sanmenxia_layer', data: sanmenxiaData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '南阳', id: 'nanyang_layer', data: nanyangaData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '商丘', id: 'shangqiu_layer', data: shangqiuData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '信阳', id: 'xinyang_layer', data: xinyangData, color: '0, 100, 252', outline_color: '#0064fc' },
    { name: '周口', id: 'zhoukou_layer', data: zhoukouData, color: '255, 100, 252', outline_color: '#0064fc' },
    { name: '驻马店', id: 'zhumadian_layer', data: zhumadianData, color: '0, 100, 252', outline_color: '#0064fc' },
]

const zhoukoushiData = [
    { name: '鹿邑县', id: 'luyi_layer', data: luyiData, color: '230, 179, 180', outline_color: '#0064fc' },
    { name: '太康县', id: 'taikang_layer', data: taikangData, color: '230, 179, 180', outline_color: '#0064fc' },
    { name: '郸城县', id: 'dancheng_layer', data: danchengData, color: '230, 179, 180', outline_color: '#0064fc' },
    { name: '沈丘县', id: 'shenqiu_layer', data: shenqiuData, color: '230, 179, 180', outline_color: '#0064fc' },
    { name: '商水县', id: 'shangshui_layer', data: shangshuiData, color: '230, 179, 180', outline_color: '#0064fc' },
    { name: '西华县', id: 'xihua_layer', data: xihuaData, color: '230, 179, 180', outline_color: '#0064fc' },
    { name: '扶沟县', id: 'fugou_layer', data: fugouData, color: '230, 179, 180', outline_color: '#0064fc' },
    { name: '川汇区', id: 'chuanhuiqu_layer', data: chuanhuiquData, color: '230, 179, 180', outline_color: '#0064fc' },
    { name: '淮阳区', id: 'huaiyangqu_layer', data: huaiyangquData, color: '230, 179, 180', outline_color: '#0064fc' },
    { name: '项城市', id: 'xiangchengshi_layer', data: xiangchengshiData, color: '230, 179, 180', outline_color: '#0064fc' },
]

export { homeData, houchenData, luyiData, bozhouData, henanshengData, zhoukoushiData };