// src/components/Weather.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";

const Weather = () => {
  const [city, setCity] = useState("Dhaka");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_APP_ID
        }&units=metric`
      );
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
    }
  };

  useEffect(() => {
    fetchWeather("Dhaka");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="weather_box">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">
          <FaSearch size={16} />
        </button>
      </form>
      {weather && (
        <div className="we_infos">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "36px",
            }}
          >
            <p>{weather.sys.country},</p>
            <p>{weather.name}</p>
          </div>
          <h1>{weather.main.temp}°C</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="/cloud.png"
              height="180px"
              width="180px"
              className="cloud_img"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <WiHumidity size={26} />
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {weather.main.humidity}
              </p>
            </div>
            <div style={{ display: "flex" }}>
              <FiWind size={26} />
              <p
                style={{
                  marginLeft: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {weather.wind.speed}
                <br />
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "12px",
            }}
          >
            <b>Desc : </b>{" "}
            <p style={{ marginLeft: "6px" }}>{weather.weather[0].main}</p>
          </div>
          {/* <h3>Weather in {weather.name}</h3>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p> */}
        </div>
      )}
    </div>
  );
};

export default Weather;
