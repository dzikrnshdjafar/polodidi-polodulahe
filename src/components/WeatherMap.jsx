import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const WeatherMap = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(Math.floor(now.getHours() / 6) * 6).padStart(2, '0'); // Get the closest 6-hour interval
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}${month}${day}${hours}00`;
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Gorontalo.xml', {
                    headers: {
                        'Content-Type': 'application/xml'
                    }
                });

                const parser = new DOMParser();
                const xml = parser.parseFromString(response.data, 'application/xml');
                const areas = xml.getElementsByTagName('area');
                const today = getCurrentDateTime(); // Get current date and time

                const weatherData = Array.from(areas).map(area => {
                    const parameters = area.getElementsByTagName('parameter');
                    const humidityData = Array.from(parameters).find(p => p.getAttribute('id') === 'hu');
                    const temperatureData = Array.from(parameters).find(p => p.getAttribute('id') === 't');
                    const windDirectionData = "N"; // Placeholder

                    const humidity = Array.from(humidityData.getElementsByTagName('timerange')).find(tr => tr.getAttribute('datetime') === today);
                    const temperature = Array.from(temperatureData.getElementsByTagName('timerange')).find(tr => tr.getAttribute('datetime') === today);

                    return {
                        id: area.getAttribute('id'),
                        name: area.getElementsByTagName('name')[0].textContent,
                        latitude: parseFloat(area.getAttribute('latitude')),
                        longitude: parseFloat(area.getAttribute('longitude')),
                        humidity: humidity ? humidity.getElementsByTagName('value')[0].textContent : 'N/A',
                        temperature: temperature ? temperature.getElementsByTagName('value')[0].textContent : 'N/A',
                        weather: 'Clear', // Placeholder; should replace with actual weather data
                        windDirection: windDirectionData,
                    };
                });

                setLocations(weatherData);
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

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
              <p>Humidity: {location.humidity}%</p>
              <p>Temperature: {location.temperature}°C</p>
              <p>Weather: {location.weather}</p>
              <p>Wind Direction: {location.windDirection}</p>
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
