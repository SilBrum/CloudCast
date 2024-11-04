import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function WeatherMap({ latitude, longitude, cityName }) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // OpenWeather API Key

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={[latitude, longitude]} zoom={10} style={{ height: '100%', width: '100%' }}>
        {/* OpenWeatherMap Temperature Layer */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
        />
        
        {/* Marker for City */}
        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>{cityName}</strong>
            <br />
            Latitude: {latitude}
            <br />
            Longitude: {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default WeatherMap;
