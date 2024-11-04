import React from 'react';
import './RainChart.css';

function RainChart({ hourlyData }) {
  if (!hourlyData || hourlyData.length === 0) {
    return <p>No rain data available</p>;
  }

  // Changes the color of the bars accordingly to the rain intensity
  const getRainBarColor = (rain) => {
    if (rain >= 5) return 'rgb(216, 19, 52)'; // Heavy rain
    if (rain > 0) return 'rgb(254, 115, 131)';  // Light rain
    return 'rgb(84, 167, 162)';              // No rain
  };

  return (
    <div className="rain-chart-card">
      <div className="rain-chart-grid">
        {hourlyData.map((hour, index) => (
          <div key={index} className="rain-bar-wrapper">
            <div
              className="rain-bar"
              style={{
                height: `${(hour.rain ? (hour.rain['1h'] || hour.rain['3h'] / 3) : 0) * 10}px`,
                backgroundColor: getRainBarColor(hour.rain ? (hour.rain['1h'] || hour.rain['3h'] / 3) : 0),
              }}
            ></div>
            <div className="rain-label">
              {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit'})}
              <br />
              {hour.rain ? `${(hour.rain['1h'] || hour.rain['3h'] || 0)} mm` : '0 mm'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RainChart;
