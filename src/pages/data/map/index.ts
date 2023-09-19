import { FeatureCollection } from '@/interface/houchen/map'
import * as home from './home.json';
import * as houchen from './houchen.json';


const homeData: FeatureCollection = home as FeatureCollection;
const houchenData: FeatureCollection = houchen as FeatureCollection;

export { homeData, houchenData };