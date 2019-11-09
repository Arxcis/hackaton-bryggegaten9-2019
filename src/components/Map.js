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

    componentDidMount() {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [10.8358, 59.7195],
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