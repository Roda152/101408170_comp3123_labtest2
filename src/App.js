import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import "./App.css";

const API_KEY = "e34b89bc89cf70ddff598258d1304d4a";

function App() {
  const [city, setCity] = useState("Berlin");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [uvIndex, setUvIndex] = useState(null); 

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const weather = await weatherResponse.json();
      setWeatherData(weather);

      if (weather.coord) {
        fetchUvIndex(weather.coord.lat, weather.coord.lon);
      }

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const forecast = await forecastResponse.json();
      setForecastData(forecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchUvIndex = async (lat, lon) => {
    try {
      const uvResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const uvData = await uvResponse.json();
      setUvIndex(uvData.value); 
    } catch (error) {
      console.error("Error fetching UV index:", error);
      setUvIndex("N/A");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.city.value.trim();
    if (searchValue) {
      setCity(searchValue);
    }
  };

  
  const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return today.toLocaleDateString(undefined, options);
  };

  return (
    <div className="app">
      <h1>Weather Forecast</h1>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          name="city"
          placeholder="Enter city name..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      
      {weatherData && (
        <WeatherCard
          city={weatherData.name}
          country={weatherData.sys.country}
          temperature={weatherData.main.temp}
          description={weatherData.weather[0].description}
          icon={weatherData.weather[0].icon}
          humidity={weatherData.main.humidity}
          wind={weatherData.wind.speed}
          pressure={weatherData.main.pressure}
          uvIndex={uvIndex}
          date={getCurrentDate()} 
        />
      )}

      
      {forecastData && <Forecast forecast={forecastData.list} />}
    </div>
  );
}

export default App;
