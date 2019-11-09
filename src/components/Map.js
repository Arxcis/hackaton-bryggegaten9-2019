import React, {Component} from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './Map.css';

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            map: null,
            online: false,
        }
    }

    updateConnectionStatus = () => {
        this.setState({ online: window.navigator.onLine });
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

        this.setState({ map });

        window.addEventListener('online', this.updateConnectionStatus)
        window.addEventListener('offline', this.updateConnectionStatus)
        this.updateConnectionStatus();
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.updateConnectionStatus)
        window.removeEventListener('offline', this.updateConnectionStatus)
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

export default Map;