import React from "react";
import "./InputLocation.css";

function InputLocation({ city, onChange }) {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="search for a city"
        value={city}
        onChange={onChange}
        className="input"
      />
    </div>
  );
}
export default InputLocation;
