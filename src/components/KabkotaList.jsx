import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import { isNightTime } from '../utils/TimeUtils';
import { weatherConditions, dayIcons, nightIcons } from '../utils/WeatherUtils';
import WeatherMap from './WeatherMap';

const KabkotaList = () => {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

                const forecastData = Array.from(areas).map(area => {
                    const parameters = area.getElementsByTagName('parameter');
                    let weatherCode = null;
                    let temperature = null;
                    let windDirection = null;

                    // Extract weather code and temperature data
                    for (let param of parameters) {
                        const id = param.getAttribute('id');
                        if (id === 'weather') {
                            weatherCode = param.getElementsByTagName('value')[0].textContent;
                        } else if (id === 't') {
                            temperature = param.getElementsByTagName('value')[0].textContent;
                        }
                        else if (id === 'wd') {
                            windDirection = param.getElementsByTagName('value')[1].textContent;
                        }
                    }

                    const weather = weatherConditions[weatherCode] || 'Tidak diketahui';

                    return {
                        id: area.getAttribute('id'),
                        name: area.getElementsByTagName('name')[0].textContent,
                        weather,
                        temperature,
                        latitude: parseFloat(area.getAttribute('latitude')),
                        longitude: parseFloat(area.getAttribute('longitude')),
                        windDirection,
                        
                    };
                });

                setForecast(forecastData);
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) return <span className="loading loading-spinner text-secondary"></span>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    const isNight = isNightTime();
    const icons = isNight ? { ...dayIcons, 'Cerah': nightIcons['Cerah Malam'], 'Cerah Berawan': nightIcons['Cerah Berawan Malam'] } : dayIcons;

    return (
        <div className="content">
            <div className="flex flex-wrap gap-10 justify-center hidden md:flex">
                {forecast.map(area => (
                    <Card key={area.id} area={area} weatherIcons={icons} />
                ))}
            </div>
            <div className="carousel carousel-center rounded-box space-x-4 p-4 md:hidden" style={{ width: '100%' }}>
                {forecast.map(area => (
                    <div key={area.id} className="carousel-item" style={{ minWidth: '100%' }}>
                        <Card area={area} weatherIcons={icons} />
                    </div>
                ))}
            </div>
            <WeatherMap locations={forecast} />
        </div>
    );
};

export default KabkotaList;
