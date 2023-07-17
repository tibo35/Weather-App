import React, { useState } from "react";

function FetchWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
    fetchWeather();
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

  return (
    <div>
      <input
        type="text"
        placeholder="search for a city"
        value={city}
        onChange={handleInputChange}
      />
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.location.name}</h2>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default FetchWeather;
