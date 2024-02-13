import React from 'react';
import { MapContainer, Rectangle, Polygon, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const zones = {
    1: {
        "shape": "rectangle",
        "bounds": [[0.01, 0.5], [0.02, 0]],
        "color": "#272927"
    },
    2: {
        "shape": "polygon",
        "bounds": [[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]],
        "color": "#0fffaa"
    },
    3: {
        "shape": "circle",
        "bounds": [0, 0],
        "radius": 600,
        "color": "#f000ff"
    }
}

const position = [0, 0];

function App() {
    const createShape = (zone) => {
        switch(zone.shape) {
            case 'rectangle':
                return <Rectangle bounds={zone.bounds} color={zone.color} fillOpacity={1} />;
            case 'polygon':
                return <Polygon positions={zone.bounds} color={zone.color} fillOpacity={1} />;
            case 'circle':
                return <Circle center={zone.bounds} radius={zone.radius} color={zone.color} fillOpacity={1} />;
            default:
                return null;
        }
    };

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', backgroundColor: '#d3d3d3' }}>
                {Object.values(zones).map((zone, index) => (
                    <React.Fragment key={index}>
                        {createShape(zone)}
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
}

export default App;