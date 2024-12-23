import React, { useState, useEffect } from 'react';
import './Home.css';
import headericon from '../src/Images/Wicon.png';
import GetLocation from '../src/Hooks/Location';
import axios from 'axios';

function Home() {
  const { location, error } = GetLocation(); // Get location from the custom hook
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '818f9cb705ff681687b18c97a1c81d37';  

  const fetchWeatherData = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData(location.latitude, location.longitude);
    }
  }, [location]);

  return (
    <div className="Home">
      <div className="Home-con">
        <div className="Headerinnercon">
          <img src={headericon} alt="icon" className="Headericon" />
          <div className="Headerinnercon2">
            <h1 className="Heading">Weatherir</h1>
            <h2 className="Subheading">Know how's your clouds looking</h2>
          </div>
        </div>
        <div className="Weathercon">
          {loading && <p>Loading weather data...</p>}
          {error && <p>{error}</p>}
            <p className='Temperature'>{weatherData.main.temp}°C</p>
            <p className='Description'>{weatherData.weather[0].description}</p>
            <h2 className='Locationname'>{weatherData.name}, {weatherData.sys.country}</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
