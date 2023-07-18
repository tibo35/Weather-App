import React, { useState, useEffect } from "react";
import CardWeather from "../Cards/CardWeather";
import InputLocation from "../InputLocation/InputLocation";

function FetchWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = () => {
    const apiKey = "c0831124734b465d822110954231207";
    const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    Promise.all([fetch(currentWeatherUrl), fetch(forecastUrl)])
      .then(([currentWeatherResponse, forecastResponse]) => {
        return Promise.all([
          currentWeatherResponse.json(),
          forecastResponse.json(),
        ]);
      })
      .then(([currentWeatherData, forecastData]) => {
        console.log(currentWeatherData); // Log the current weather API response for debugging
        console.log(forecastData); // Log the forecast API response for debugging

        if (currentWeatherData.error) {
          setError(currentWeatherData.error.message);
          setWeather(null);
        } else {
          setWeather(currentWeatherData);
          setError(null);
        }

        if (forecastData.error) {
          setForecast(null);
        } else {
          setForecast(forecastData);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred while fetching the weather data.");
        setWeather(null);
        setForecast(null);
      });
  };

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div>
      <InputLocation onChange={handleInputChange} city={city} />
      {error && <p>{error}</p>}
      {weather && forecast && (
        <div>
          <CardWeather
            temperature={weather.current.temp_c}
            location={weather.location.name}
            condition={weather.current.condition.text}
            conditionIcon={weather.current.condition.icon}
            isDayTime={weather.current.is_day}
          />
          <div>
            {forecast.forecast.forecastday.map((day) => (
              <CardWeather
                key={day.date}
                temperature={day.day.avgtemp_c}
                location={weather.location.name}
                condition={day.day.condition.text}
                conditionIcon={day.day.condition.icon}
                isDayTime={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchWeather;
