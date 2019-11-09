import {Component} from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            map: null,
        }
    }


    render() {
        return {
            <div id="mapContainer">
            
            
            </div>
        }
    }
}

export default Map;