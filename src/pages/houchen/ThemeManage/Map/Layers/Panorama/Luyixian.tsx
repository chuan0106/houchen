import { FC, useState } from 'react';
import styles from './style.less'

import { connect } from 'dva';
import { Source, Layer } from 'react-map-gl';

import { luyiData } from '@/pages/data/map';
type Props = {

}
const Luyixian: FC<Props> = () => {
    return <Source id="鹿邑" type="geojson" data={luyiData}>
        <Layer
            id="luyi-layer"
            type="fill"
            paint={{
                'fill-color': 'rgba(0, 100, 252,.5)',
                'fill-opacity': 0.6,
                'fill-outline-color': '#0064fc',
            }}
        />
    </Source>
};
export default Luyixian