// src/utils/WeatherUtils.js

import logo from '../assets/react.svg'; // Default logo
import clearSkies from '../assets/clear-skies.svg';
import nightClearSkies from '../assets/night-clear-skies.svg';
import nightPartlyCloudy from '../assets/night-partly-cloudy.svg';
import partlyCloudy from '../assets/partly-cloudy.svg';
import cloudy from '../assets/mostly-cloudy.svg';
import overcast from '../assets/overcast.svg';
import haze from '../assets/haze.svg';
import smoke from '../assets/smoke.svg';
import fog from '../assets/fog.svg';
import lightRain from '../assets/light-rain.svg';
import moderateRain from '../assets/rain.svg';
import heavyRain from '../assets/heavy-rain.svg';
import localRain from '../assets/isolated-rain.svg';
import thunderstorm from '../assets/severe-thunderstorm.svg';

export const weatherConditions = {
    '0': 'Cerah',
    '1': 'Cerah Berawan',
    '2': 'Cerah Berawan',
    '3': 'Berawan',
    '4': 'Berawan Tebal',
    '5': 'Udara Kabur',
    '10': 'Asap',
    '45': 'Kabut',
    '60': 'Hujan Ringan',
    '61': 'Hujan Sedang',
    '63': 'Hujan Lebat',
    '80': 'Hujan Lokal',
    '95': 'Hujan Petir',
    '97': 'Hujan Petir',
};

export const dayIcons = {
    'Cerah': clearSkies,
    'Cerah Berawan': partlyCloudy,
    'Berawan': cloudy,
    'Berawan Tebal': overcast,
    'Udara Kabur': haze,
    'Asap': smoke,
    'Kabut': fog,
    'Hujan Ringan': lightRain,
    'Hujan Sedang': moderateRain,
    'Hujan Lebat': heavyRain,
    'Hujan Lokal': localRain,
    'Hujan Petir': thunderstorm,
    'Tidak diketahui': logo, // Default icon if condition is unknown
};

export const nightIcons = {
    'Cerah Malam': nightClearSkies, // ganti dengan nightClearSkies
    'Cerah Berawan Malam': nightPartlyCloudy, // ganti dengan nightPartlyCloudy
    'Berawan': cloudy,
    'Berawan Tebal': overcast,
    'Udara Kabur': haze,
    'Asap': smoke,
    'Kabut': fog,
    'Hujan Ringan': lightRain,
    'Hujan Sedang': moderateRain,
    'Hujan Lebat': heavyRain,
    'Hujan Lokal': localRain,
    'Hujan Petir': thunderstorm,
    'Tidak diketahui': logo, // Default icon if condition is unknown
};

export const windDirection = {
            'N': 'Utara',
            'NNE': 'Utara-Timur Laut',
            'NE': 'Timur Laut',
            'ENE': 'Timur-Timur Laut',
            'E': 'Timur',
            'ESE': 'Timur-Tenggara',
            'SE': 'Tenggara',
            'SSE': 'Selatan-Tenggara',
            'S': 'Selatan',
            'SSW': 'Selatan-Barat Daya',
            'SW': 'Barat Daya',
            'WSW': 'Barat-Barat Daya',
            'W': 'Barat',
            'WNW': 'Barat-Barat Laut',
            'NW': 'Barat Laut',
            'NNW': 'Utara-Barat Laut',
}
