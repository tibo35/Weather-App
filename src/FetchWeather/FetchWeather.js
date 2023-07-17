import React, { useState, useEffect } from "react";
import CardWeather from "../Cards/CardWeather";
import InputLocation from "../InputLocation/InputLocation";

function FetchWeather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = () => {
    const apiKey = "c0831124734b465d822110954231207";
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the API response for debugging

        if (data.error) {
          setError(data.error.message);
          setWeather(null);
        } else {
          setWeather(data);
          setError(null);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred while fetching the weather data.");
        setWeather(null);
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
      {weather && (
        <CardWeather
          temperature={weather.current.temp_c}
          location={weather.location.name}
          condition={weather.current.condition.text}
          conditionIcon={weather.current.condition.icon}
          isDayTime={weather.current.is_day} // 1 means it's day, 0 means it's night
        />
      )}
    </div>
  );
}

export default FetchWeather;
