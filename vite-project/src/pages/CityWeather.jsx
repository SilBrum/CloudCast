import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import UnitToggle from '../components/UnitToggle';
import WeatherMap from '../components/WeatherMap';
import './CityWeather.css';
import Footer from '../components/Footer';
import RainChart from '../components/RainChart';

function CityWeather() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [unit, setUnit] = useState('metric'); //default units
  const [showContent, setShowContent] = useState(false); // For transition effect
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

 

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`, {
            params: { q: city, units: unit, appid: apiKey },
          }
        );
        setWeather(weatherResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast`, {
            params: { q: city, units: unit, appid: apiKey },
          }
        );

        setHourlyForecast(forecastResponse.data.list.slice(0, 8)); // Process hourly forecast for 8 hours
        const dailyForecast = groupForecastByDay(forecastResponse.data.list);
        setForecast(dailyForecast);

        // Fetch Air Quality Data
        const airQualityResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution`, {
            params: {
              lat: weatherResponse.data.coord.lat,
              lon: weatherResponse.data.coord.lon,
              appid: apiKey,
            },
          }
        );
        setAirQuality(airQualityResponse.data);

        document.body.className = getWeatherClass(weatherResponse.data.weather[0].main);

        setTimeout(() => setShowContent(true), 100); 
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
      
    };

    fetchWeatherData();
  }, [city, unit]);

  const groupForecastByDay = (forecastList) => {
    const days = {};
    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!days[date]) days[date] = [];
      days[date].push(item);
    });

    return Object.entries(days).map(([date, entries]) => ({
      date,
      temp: entries[0].main.temp,
      description: entries[0].weather[0].description,
      min: Math.min(...entries.map(e => e.main.temp_min)),
      max: Math.max(...entries.map(e => e.main.temp_max)),
      rain: entries.reduce((acc, e) => acc + (e.rain?.['3h'] || 0), 0),
    }));
  };

  const getWeatherClass = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear': return 'sunny';
      case 'rain': case 'drizzle': return 'rainy';
      case 'snow': return 'snowy';
      default: return '';
    }
  };

  const getAirQualityDescription = (index) => {
    if (index <= 50) return 'Good';
    if (index <= 100) return 'Moderate';
    if (index <= 150) return 'Unhealthy for Sensitive Groups';
    if (index <= 200) return 'Unhealthy';
    if (index <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  if (!weather) return <p>We could not find data for this location.</p>;

  return (
    <div className={`city-weather ${showContent ? 'show' : ''}`}>
      <UnitToggle onUnitChange={setUnit} />
      <SearchBar />
    
      {/* Main Weather Card */}
      <div className="main-weather-card">
        <div>
          <h2>{weather.name}</h2>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
          <p>{weather.weather[0].description}</p>
          <h3>{weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</h3>
        </div>
      </div>

      {/* Rain and Air Quality Cards */}
      <div className="detail-cards-container">
        <div className="detail-card">
          <h4>Humidity</h4>
          <p>{weather.main.humidity}%</p>
        </div>
        <div className="detail-card">
          <h4>Air Quality</h4>
          <p>{airQuality ? getAirQualityDescription(airQuality.list[0].main.aqi) : 'Loading...'}</p>
        </div>
      </div>

      <div className="rain-chart-card">
        <h4>Rain Levels</h4>
          <RainChart hourlyData={hourlyForecast} />
      </div>

      {/* Hourly Forecast Card */}
      <div className="hourly-forecast-card">
        <h4>Hourly Forecast</h4>
        <div className="hourly-forecast-details">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="hour-card">
              {hour.weather && hour.weather[0] && (
                <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="Hourly Weather Icon" />
              )}
              <p>{hour.main.temp ? `${hour.main.temp}°${unit === 'metric' ? 'C' : 'F'}` : 'N/A'}</p>
              <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit'})}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Day Forecast Card */}
      <div className="forecast-card">
        <h4>5-Day Forecast</h4>
        <div className="forecast-details">
          {forecast.map((day, index) => (
            <div key={index} className="day-card">
              <p>{day.date}</p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Forecast Icon" />
              <p>Min: {day.min}°</p>
              <p>Max: {day.max}°</p>
            </div>
          ))}
        </div>
      </div>

      {/* Map Card */}
      <div className="map-card">
        <h4> Heat Map </h4>
        <WeatherMap latitude={weather.coord.lat} longitude={weather.coord.lon} cityName={weather.name} />
      </div>
      <Footer />
    </div>
  );
}

export default CityWeather;
