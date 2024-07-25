import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ area, weatherIcons }) => (
    <div className="card bg-base-100 w-82 shadow-xl relative" key={area.id}>
        <figure className="px-10 mx-auto -mt-10">
            <img 
                src={weatherIcons[area.weather]} 
                alt={area.weather} 
                className="rounded-xl w-64" 
            />
        </figure>
        <div className="card-body items-center text-center -mt-20">
            <h2 className="card-title">{area.name}</h2>
            <div className="relative">
                <p className="text-5xl font-bold">{area.temperature}</p>
                <span className="absolute top-0 left-14 text-lg font-bold">°C</span>
            </div>
            <p>{area.weather}</p>
            <div className="card-actions">
                    <Link to={`kabkota/${area.id}`}>
                <button className="btn btn-primary font-bold">
                    Rincian
                </button>
                    </Link>
            </div>
        </div>
    </div>
);


export default Card;
