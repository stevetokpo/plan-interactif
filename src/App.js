import React from 'react';
import { MapContainer, Rectangle, Polygon, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function createSections(sectionNames, colsPerSection, rowsPerSection, startAt, endBefore) {
    const sections = {};

    sectionNames.forEach((sectionName, sectionIndex) => {
        for (let row = 0; row < rowsPerSection; row++) {
            for (let col = startAt; col < colsPerSection - endBefore; col++) {
                const key = `${sectionName}${col}${row === 0 ? 'A' : row === 1 ? 'B' : row === 2 ? 'C' : row === 3 ? 'D' : 'E'}`;
                sections[key] = {
                    "shape": "rectangle",
                    "bounds": [[-4 + col + sectionIndex * colsPerSection, 1 + row], [-3 + col + sectionIndex * colsPerSection, 2 + row]],
                    "color": sectionName === 'A' ? "#94a6ff" : "#ff9494" // Example colors, change as needed
                };
            }
        }
    });

    return sections;
}

// Exemple d'utilisation :
const sectionNames = ['A', 'B', 'C', 'D', 'E']; // Noms des sections
const colsPerSection = 10; // Nombre de colonnes par section
const rowsPerSection = 5; // Nombre de lignes par section
const startAt = 1; // Commencer à la deuxième colonne pour l'aération
const endBefore = 1; // Finir une colonne avant pour l'aération

const zones = createSections(sectionNames, colsPerSection, rowsPerSection, startAt, endBefore);

const position = [0, 0];

function App() {
    const createShape = (zone, key) => {
        let element = null;

        switch (zone.shape) {
            case 'rectangle':
                element = (
                    <Rectangle bounds={zone.bounds} weight={5} color={zone.color} fillOpacity={0.5}>
                        <Popup>Zone {key}: Un rectangle</Popup>
                    </Rectangle>
                );
                break;
            case 'polygon':
                element = (
                    <Polygon positions={zone.bounds} weight={5} color={zone.color} fillOpacity={0.5}>
                        <Popup>Zone {key}: Un polygone</Popup>
                    </Polygon>
                );
                break;
            case 'circle':
                element = (
                    <Circle center={zone.bounds} weight={5} radius={zone.radius} color={zone.color} fillOpacity={0.3}>
                        <Popup>Zone {key}: Un cercle</Popup>
                    </Circle>
                );
                break;
            default:
                break;
        }
        return element;
    };

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <MapContainer center={position} zoom={5} style={{ height: '100%', width: '100%', backgroundColor: '#d3d3d3' }}>
                {Object.entries(zones).map(([key, zone]) => (
                    <React.Fragment key={key}>
                        {createShape(zone, key)}
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
}

export default App;