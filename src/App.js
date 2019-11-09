import React from 'react';
import './App.css';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Mapbox PWA demo
        </p>
      </header>
      <Map />
    </div>
  );
}

export default App;
