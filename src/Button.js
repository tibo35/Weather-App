import React from "react";
import "/Users/thibaudaptel/Documents/Code/weather-app/src/Button.css";
function Button({ onClick }) {
  return (
    <button className="get-weather" onClick={onClick}>
      Get Weather
    </button>
  );
}

export default Button;
