import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDateTime } from '../utils/GetRealTimesUtils';
import { getTranslatedDescription } from '../utils/WeatherTranslatedutils';
import { weatherConditions, windDirection } from '../utils/WeatherUtils';

const KabkotaDetail = () => {
    const { id } = useParams();
    const [forecast, setForecast] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedParameter, setSelectedParameter] = useState('hu'); // Set initial state to 'hu'

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

                const areaData = Array.from(areas).find(area => area.getAttribute('id') === id);
                if (!areaData) throw new Error('Area not found');

                const parameters = areaData.getElementsByTagName('parameter');

                const weatherInfo = Array.from(parameters).map(parameter => {
                    const parameterId = parameter.getAttribute('id');
                    const parameterDescription = parameter.getAttribute('description');
                    const timeranges = parameter.getElementsByTagName('timerange');

                    const timerangeData = Array.from(timeranges).map(timerange => {
                        const datetime = timerange.getAttribute('datetime');
                        const values = Array.from(timerange.getElementsByTagName('value')).map(value => ({
                            unit: value.getAttribute('unit'),
                            text: value.textContent
                        }));

                        return {
                            datetime,
                            values
                        };
                    });

                    return {
                        id: parameterId,
                        description: parameterDescription,
                        data: timerangeData
                    };
                });

                setForecast({
                    areaName: areaData.getElementsByTagName('name')[0].textContent,
                    weatherInfo
                });
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchWeather();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    // Filter weatherInfo based on selectedParameter
    const filteredWeatherInfo = forecast.weatherInfo.filter(info => info.id === selectedParameter);

    return (
        <div>
            {filteredWeatherInfo.length > 0 ? (
                filteredWeatherInfo.map((info, idx) => {
                    const translatedDescription = getTranslatedDescription(info.description);

                    return (
                        <div key={idx} className='content'>
            <div className="dropdown dropdown-hover mb-4">
                <div tabIndex={0} role="button" className="btn m-1"><h3>{translatedDescription}</h3></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a onClick={() => setSelectedParameter('hu')}>Kelembaban Udara</a></li>
                    <li><a onClick={() => setSelectedParameter('humax')}>Kelembaban Udara Maksimum</a></li>
                    <li><a onClick={() => setSelectedParameter('humin')}>Kelembaban Udara Minimum</a></li>
                    <li><a onClick={() => setSelectedParameter('tmax')}>Suhu Udara Maksimum</a></li>
                    <li><a onClick={() => setSelectedParameter('tmin')}>Suhu Udara Minimum</a></li>
                    <li><a onClick={() => setSelectedParameter('t')}>Suhu Udara</a></li>
                    <li><a onClick={() => setSelectedParameter('weather')}>Cuaca</a></li>
                    <li><a onClick={() => setSelectedParameter('wd')}>Arah Angin</a></li>
                    <li><a onClick={() => setSelectedParameter('ws')}>Kecepatan Angin</a></li>
                </ul>
            </div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Waktu</th>
                                        {info.data[0].values.map((value, j) => (
                                            <th key={j}>{value.unit}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {info.data.map((data, i) => (
                                        <tr key={i}>
                                            <td>{formatDateTime(data.datetime)}</td>
                                            {data.values.map((value, j) => {
                                                let displayValue = value.text;

                                                // Add units based on parameter ID
                                                if (info.id === 'weather') {
                                                    displayValue = weatherConditions[value.text] || value.text;
                                                } else if (info.id === 't' || info.id === 'tmax' || info.id === 'tmin') {
                                                    displayValue = `${value.text}°${value.unit === 'C' ? 'C' : 'F'}`;
                                                } else if (value.unit === '%') {
                                                    displayValue = `${value.text}%`;
                                                } else if (value.unit === 'deg' || value.unit === 'SEXA' ) {
                                                    displayValue = `${value.text} ${value.unit}`;
                                                } else if (['Kt', 'MPH', 'KPH', 'MS'].includes(value.unit)) {
                                                    displayValue = `${value.text} ${value.unit}`;
                                                } else if (info.id === 'wd') {
                                                    displayValue = windDirection[value.text] || value.text;
                                                }
                                                

                                                return (
                                                    <td key={j}>{displayValue}</td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })
            ) : (
                <p>No data available</p>
            )}
            {/* <WeatherMap /> */}
        </div>
    );
};

export default KabkotaDetail;
