import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import UnitToggle from '../components/UnitToggle';
import axios from 'axios';
import './Home.css';
import Footer from '../components/Footer';

function Home() {
  const [randomCities, setRandomCities] = useState([]);
  const [unit, setUnit] = useState('metric'); 
  const [loading, setLoading] = useState(true); // Loading state
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY; 

  useEffect(() => {
    const allCities = [
      'Vancouver', 'Rio de Janeiro', 'Budapest', 'Tokyo', 'New York', 
      'London', 'Paris', 'Sydney', 'Moscow', 'Dubai', 'Beijing', 'Mumbai', 'Cataguases', 'Belo Horizonte'
    ];

    // Function to get a random cities within the cities listed
    const getRandomCities = (num) => {
      const shuffled = [...allCities].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num); // Get 'num' random cities
    };

    const fetchWeather = async (city) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: city,
              units: unit,
              appid: apiKey,
            },
          }
        );
        return { city, temp: response.data.main.temp };
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
        return { city, temp: 'N/A' };
      }
    };

    setLoading(true);
    const randomCities = getRandomCities(4); // Choose 4 random cities between the ones we entered
    Promise.all(randomCities.map(fetchWeather))
      .then(setRandomCities)
      .finally(() => setLoading(false));
  }, [unit, apiKey]);

  return (
    <div className="home">
      <div className="header">
        <h1>
          Plan your day<br />
          with <span className="highlight">CloudCast</span>
        </h1>
        <h4>No ads, no distractions, straight to the point.</h4>
        <SearchBar />
        <div className="header_image"></div> 
      </div>
      <div className="content">
        {loading ? (
          <p>Loading weather data...</p>
        ) : (
          <div className="city-cards">
            {randomCities.map((data) => (
              <WeatherCard key={data.city} city={data.city} temp={data.temp} unit={unit} />
            ))}
          </div>
        )}
      </div>
      <UnitToggle onUnitChange={setUnit} />
      <Footer />
    </div>
  );
}

export default Home;
