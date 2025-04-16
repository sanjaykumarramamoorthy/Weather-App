import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./App.css";

const API_KEY = "080e0ea61dbbd80729fee641d629dfa0";
function App() {
  const [city, setCity] = useState("Chennai");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
    } catch (err) {
      alert("City not found!");
    }
    setLoading(false);
  };

  useEffect(() => {
    getWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  const getBackgroundClass = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return "clear-bg";
      case "Clouds":
        return "cloudy-bg";
      case "Rain":
        return "rainy-bg";
      case "Snow":
        return "snowy-bg";
      default:
        return "default-bg";
    }
  };

  const getWeatherImage = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return "/images/clear.png";
      case "Clouds":
        return "/images/cloudy.png";
      case "Rain":
        return "/images/rainy.png";
      case "Snow":
        return "/images/snowy.png";
      default:
        return "/images/clear.png"; 
}
  };

  return (
    <div
      className={`app ${weather ? getBackgroundClass(weather.weather[0].main) : ""}`}
      style={{
        backgroundImage: weather ? `url(${getWeatherImage(weather.weather[0].main)})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {loading ? (
          <div className="loader">
            <ClipLoader color="#ffffff" size={60} />
          </div>
        ) : (
          weather && (
            <div className="weather-card fade-in">
              <h2>{weather.name}</h2>
              <p>{weather.weather[0].main}</p>
              <h1>{Math.round(weather.main.temp)}°C</h1>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;

