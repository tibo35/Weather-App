import React from "react";
import style from "./CardWeather.css";
import WeatherIcon from "../resources/Moon cloud mid rain.png";

function CardWeather({ temperature, location, condition }) {
  return (
    <div className="weather-card">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="280"
        height="184"
        viewBox="0 0 342 175"
        fill="none">
        <path
          d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z"
          fill="url(#paint0_linear_503_87)"
        />
        <image
          x="170"
          y="15"
          width="130"
          height="130"
          xlinkHref={WeatherIcon}
          preserveAspectRatio="xMinYMin meet"
        />
        <text x="20" y="70" className="weather-temperature">
          {temperature}°C
        </text>
        <text x="20" y="100" className="weather-location">
          {location}
        </text>
        <text x="20" y="130" className="weather-condition">
          {condition}
        </text>
        <defs>
          <linearGradient
            id="paint0_linear_503_87"
            x1="0"
            y1="128"
            x2="354.142"
            y2="128"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#5936B4" />
            <stop offset="1" stop-color="#362A84" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
export default CardWeather;
