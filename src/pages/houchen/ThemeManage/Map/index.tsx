import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'umi';
import { connect } from 'dva';
import { Map, LayerProps, Marker, Popup, MapRef, MapLayerMouseEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ControlPanel from './control-panel';
import Layers from './Layers'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2h1YW4wMTA2IiwiYSI6ImNrc3UzaHM0NDFjbTMydm1kaG1vaW1tN3YifQ.vMtkKlcWXantTp1p1Z6N3g'; // Set your mapbox token here

export const clusterLayer: LayerProps = {
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
    }
};

export const clusterCountLayer: LayerProps = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
};

export const unclusteredPointLayer: LayerProps = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
    }
};

type PopupInfo = {
    city: String,
    population: String,
    image?: String,  // 使用可选属性
    state: String,
    latitude: Number,
    longitude: Number
}

const App = ({ viewState }) => {
    const dispatch = useDispatch();
    const mapRef = useRef<MapRef>(null);
    // const [viewState, setViewState] = useState({
    //     zoom: 13,
    //     pitch: 62,
    //     longitude: 115.4109739,
    //     latitude: 33.8762738,
    //     minZoom: 12,
    //     maxZoom: 19,
    // })

    const initMapCallback = (even: MapLayerMouseEvent) => {

        const map = even?.target
        if (map) {
            dispatch({
                type: 'houchenModel/setMap',
                payload: map
            });
            map.on('click', (e: MapLayerMouseEvent) => {
                console.log(e);

            })
        }
    }

    const [mapStyle, setMapStyle] = useState(null);

    const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);


    // 弹窗
    const markerHandler = (city: any) => {
        setPopupInfo(city);
    }

    const onClick = (event: MapLayerMouseEvent) => {
    };

    const onMove = useCallback(({ viewState }: any) => {
        dispatch({
            type: 'houchenModel/setViewState',
            payload: viewState
        });
    }, [])

    return (
        <>
            <Map
                {...viewState}
                ref={mapRef}
                // viewState={viewState}
                // initialViewState={viewState}
                // onMove={evt => setViewState(evt.viewState)}
                onMove={onMove}
                onLoad={initMapCallback}
                mapStyle={mapStyle && mapStyle.toJS()}
                styleDiffing
                mapboxAccessToken={MAPBOX_TOKEN}
                onClick={onClick}
            >
                <Layers
                    mapRef={mapRef}
                    onMarkerClick={markerHandler}
                />
                {/* {pins} */}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.longitude)}
                        latitude={Number(popupInfo.latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            {popupInfo.city}, {popupInfo.state} |{' '}
                            <a
                                target="_new"
                                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                            >
                                Wikipedia
                            </a>
                        </div>
                        <img width="100%" src={popupInfo.image} />
                    </Popup>
                )}
            </Map>
            <ControlPanel onChange={setMapStyle} />
        </>
    );
}


function mapStateToProps({ houchenModel }: any) {
    return {
        viewState: houchenModel.viewState
    }
}
export default connect(mapStateToProps)(App);