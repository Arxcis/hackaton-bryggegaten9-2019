import React, {Component} from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './Map.css';
import { segments } from './route.json';
import arc from 'arc';


class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            map: null,
            online: false,
            geo: [],
        }
    }

    onOnline = () => {
        this.setState({ online: window.navigator.onLine });
    }
    onOffline = () => {
        this.setState({ online: window.navigator.onLine });
    }

    componentDidMount() {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

        const state = window.localStorage.getItem('map-options') || JSON.stringify({ center: [10.8358, 59.7195], zoom: 9 });
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            ...JSON.parse(state),
        });
        map.on('load', () => {
            const lineLayer = makeLineLayer();
            map.addLayer(lineLayer);
        });

        this.setState({ map });
        this.setState({ online: window.navigator.onLine });

        window.addEventListener('online', this.onOnline)
        window.addEventListener('offline', this.onOffline)
        window.addEventListener('beforeunload', this.storeMapState)
        
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.onOnline);
        window.removeEventListener('offline', this.onOffline);
        window.removeEventListener('beforeunload', this.storeMapState);

        this.storeMapState();
    }

    storeMapState = () => {
        const state = {
            center: this.state.map.getCenter(),
            zoom: this.state.map.getZoom(),
        };
        window.localStorage.setItem('map-options', JSON.stringify(state));
        
        return;
    }

    render() {

        const { online } = this.state;
        let offlineMessage;
        if (!online) {
            offlineMessage = <p className="offline">You are offline</p>
        }
        return (
            <section className="mapcontainer">
                {offlineMessage}
                <section id="map" />
            </section>
        );
    }
}


function makeLineLayer() {
    //
    // Parse route
    //
    const arcs = [];
    segments.map((it) => {
        var arcResolution = Math.ceil(it.distance/10)
        var generator = new arc.GreatCircle({x: it.from.lng, y:it.from.lat}, {x: it.to.lng, y:it.to.lat}, {})
        var geojson = generator.Arc(arcResolution)
    
        arcs.push(geojson.json())
    });



    const coordinates = arcs.reduce((normalizedCoordinates, item) => { 
        return [
            ...normalizedCoordinates,
            ...item.geometry.coordinates.slice(0, item.geometry.coordinates.length-1),
        ]
    }, []);

/*     const coordinates = segments.reduce((coordinates, { from: { lat, lng } }) => {
        return [ ...coordinates, [lng, lat] ]; 
    }, []);

    console.log(coordinates)
 */

    return {
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    coordinates,
                }
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#888",
            "line-width": 8
        }
    }
}

export default Map;