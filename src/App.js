import React from "react";
import FetchWeather from "./FetchWeather/FetchWeather";
import HistoricalWeather from "./Historical/HistoricalWeather";
import "./App.css";

function App() {
  return (
    <div>
      <h1>React Weather App</h1>
      <FetchWeather />
      <HistoricalWeather />
    </div>
  );
}

export default App;
