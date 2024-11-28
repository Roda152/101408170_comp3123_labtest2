import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({
  city,
  country,
  temperature,
  description,
  icon,
  humidity,
  wind,
  pressure,
  uvIndex,
  date, 
}) => {
  return (
    <div className="weather-card">
      <h2>
        {city}, {country}
      </h2>
      <p className="weather-date">{date}</p> 
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {wind} m/s</p>
      <p>Pressure: {pressure} hPa</p>
      <p>UV Index: {uvIndex !== null ? uvIndex : "Loading..."}</p>
    </div>
  );
};

export default WeatherCard;
