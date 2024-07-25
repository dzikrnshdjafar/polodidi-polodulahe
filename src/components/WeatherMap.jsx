import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { windDirection } from '../utils/WeatherUtils'; // Import windDirection mapping

const WeatherMap = ({ locations }) => {
    if (!locations || locations.length === 0) {
        return <p>No data available.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-neutral rounded-box shadow-lg p-4">
                <div className="h-96">
                    <MapContainer center={[0.7037410582748133, 122.44515939285745]} zoom={8} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {locations.map((location) => (
                            <Marker key={location.id} position={[location.latitude, location.longitude]}>
                                <Popup>
                                    <h3>{location.name}</h3>
                                    <p>Temperature: {location.temperature}°C</p>
                                    <p>Weather: {location.weather}</p>
                                    <p>Arah Angin: {windDirection[location.windDirection] || 'Tidak diketahui'}</p>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default WeatherMap;
