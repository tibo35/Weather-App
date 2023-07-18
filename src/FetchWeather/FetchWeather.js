import React, { useState, useEffect } from "react";
import CardWeather from "../Cards/CardWeather";
import InputLocation from "../InputLocation/InputLocation";

function FetchWeather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [isDayTime, setIsDayTime] = useState(true);
  const [forecast, setForecast] = useState([null, null, null]);
  const [isLoading, setIsLoading] = useState(true);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = () => {
    setIsLoading(true);
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
        setIsLoading(false);
        console.log(currentWeatherData); // Log the current weather API response for debugging
        console.log(forecastData); // Log the forecast API response for debugging

        if (currentWeatherData.error) {
          setWeather(null);
        } else {
          setWeather(currentWeatherData);
          setError(null);
        }

        if (forecastData.error) {
          setForecast(null); // reset to empty forecast if there's an error
        } else {
          const today = new Date(currentWeatherData.location.localtime)
            .toISOString()
            .split("T")[0];

          forecastData.forecast.forecastday =
            forecastData.forecast.forecastday.filter(
              (day) => day.date !== today
            );

          setForecast(forecastData);
        }
      })
      .catch((error) => {
        setIsLoading(false);
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
            date={weather.location.localtime}
            temperature={
              isDayTime ? weather.current.temp_c : weather.current.temp_n
            }
            location={weather.location.name}
            condition={
              isDayTime
                ? weather.current.condition.text
                : weather.current.condition_n.text
            }
            conditionIcon={
              isDayTime
                ? weather.current.condition.icon
                : weather.current.condition_n.icon
            }
            isDayTime={isDayTime}
          />
          <div>
            {forecast.forecast.forecastday.map((day) => (
              <CardWeather
                key={day.date_epoch}
                date={day.date}
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
      <div>
        {/* Render 3 empty cards unconditionally */}
        {[...Array(3)].map((_, index) => (
          <CardWeather key={index} />
        ))}
      </div>
    </div>
  );
}

export default FetchWeather;
