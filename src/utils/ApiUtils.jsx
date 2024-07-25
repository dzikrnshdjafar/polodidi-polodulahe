// src/utils/apiUtils.js

import axios from 'axios';
import { weatherConditions } from './WeatherUtils';  // Pastikan mengimpor weatherConditions

export const fetchWeatherData = async () => {
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

        // Extract weather code and temperature data
        for (let param of parameters) {
            const id = param.getAttribute('id');
            if (id === 'weather') {
                weatherCode = param.getElementsByTagName('value')[0].textContent;
            } else if (id === 't') {
                temperature = param.getElementsByTagName('value')[0].textContent;
            }
        }

        const weather = weatherConditions[weatherCode] || 'Tidak diketahui';

        return {
            id: area.getAttribute('id'),
            name: area.getElementsByTagName('name')[0].textContent,
            weather,
            temperature
        };
    });

    return forecastData;
};
