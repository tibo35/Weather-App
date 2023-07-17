import React, { useState } from "react";

function HistoricalWeather() {
  const [city, setCity] = useState("");
  const [historicalWeather, setHistoricalWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchHistoricalWeather = () => {
    const apiKey = "c0831124734b465d822110954231207";
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const apiUrl = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${formattedDate}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the API response for debugging

        if (data.error) {
          setError(data.error.message);
          setHistoricalWeather(null);
        } else {
          setHistoricalWeather(data);
          setError(null);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(
          "An error occurred while fetching the historical weather data."
        );
        setHistoricalWeather(null);
      });
  };

  return (
    <div>
      <input type="text" value={city} onChange={handleInputChange} />
      <button onClick={fetchHistoricalWeather}>Get Historical Weather</button>
      {error && <p>{error}</p>}
      {historicalWeather && (
        <div>
          <h2>{historicalWeather.location.name}</h2>
          <p>
            Temperature:{" "}
            {historicalWeather.forecast.forecastday[0].day.avgtemp_c}°C
          </p>
          <p>
            Condition:{" "}
            {historicalWeather.forecast.forecastday[0].day.condition.text}
          </p>
        </div>
      )}
    </div>
  );
}

export default HistoricalWeather;
