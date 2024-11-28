import React from "react";
import "./Forecast.css";

const Forecast = ({ forecast }) => {
  const dailyData = forecast.filter((item, index) => index % 8 === 0); 

  return (
    <div className="forecast-container">
      {dailyData.map((day, index) => (
        <div key={index} className="forecast-card">
          <h4>{new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</h4>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="weather-icon"
          />
          <p>{Math.round(day.main.temp)}°C</p>
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
