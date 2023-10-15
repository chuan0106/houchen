import { FC } from 'react';
import { connect } from 'dva';
import { Source, Layer } from 'react-map-gl';

import { henansheng } from '@/pages/data/map';

type Props = {
    layerActive: string;
}

const Henansheng: FC<Props> = ({ layerActive }) => {
    return henansheng.map((layer, i) => (
        <Source key={`${layer.id}${i}`} id={layer.name} type="geojson" data={layer.data}>
            <Layer
                id={`${layer.id}`}
                type="fill"
                paint={{
                    'fill-color': `rgba(${layer.color},${layerActive === layer.id ? 1 : 0.6})`,
                    'fill-opacity': 0.6,
                    'fill-outline-color': layer.outline_color,
                }}
            />
        </Source>
    ));
};

function mapStateToProps({ houchenModel }: any) {
    return {
        layerActive: houchenModel.layerActive,
    };
}

export default connect(mapStateToProps)(Henansheng);