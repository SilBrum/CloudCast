import React from 'react';
import './WeatherCard.css';

function WeatherCard({ city, temp, unit }) {
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="weather-card">
      <h3>{city} {temp !== 'N/A' ? `${temp} ${unitSymbol}` : 'N/A'}</h3>
    </div>
  );
}

export default WeatherCard;