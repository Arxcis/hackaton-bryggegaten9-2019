import React, {Component} from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './Map.css';

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            map: null,
        }
    }

    compnentDidMount() {
        mapboxgl.accessToken = 'undefined';
        
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [0, 0],
            zoom: 9,
        });

        map.on('load', () => {});

        this.setState({
            map,
        });
    }

    render() {
        return (
            <section id="map" />
        );
    }
}

export default Map;