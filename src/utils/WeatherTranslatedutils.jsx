import { weatherConditions} from './WeatherUtils';

// src/utils/weatherUtils.js
const translatedData = {
    'Humidity': 'Kelembaban Udara',
    'Max humidity': 'Kelembaban Udara Maksimal',
    'Max temperature': 'Suhu Udara Maksimum',
    'Min humidity': 'Kelembaban Udara Minimum',
    'Min temperature': 'Suhu Udara Minimum',
    'Temperature': 'Suhu Udara',
    'Weather': 'Cuaca',
    'Wind direction': 'Arah Angin',
    'Wind speed': 'Kecepatan Angin'
};

export const getTranslatedDescription = (description) => {
    return translatedData[description] || description;
};
