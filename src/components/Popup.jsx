import React from 'react';
import { Popup } from 'react-leaflet';

const PopupContent = ({ weatherInfo }) => {
    let wdId = weatherInfo.windDirection;
    let weatherId = weatherInfo.weather;

    let translatedData = {
        // Translation map here...
    };

    wdId = translatedData[wdId] || wdId;
    weatherId = translatedData[weatherId] || weatherId;

    return (
        <Popup>
            <div>
                <h3>{weatherInfo.name}</h3>
                <p>Kelembaban: {weatherInfo.humidity}%</p>
                <p>Suhu: {weatherInfo.temperature}°C</p>
                <p>Cuaca: {weatherId}</p>
                <p>Arah Angin: {wdId}</p>
            </div>
        </Popup>
    );
};

export default PopupContent;
