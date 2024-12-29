import React from "react";
import Model from "../Model"
import "../css/Intro.css";

const Intro = () => {
  return (
    <div className="intro-container">
      <div className="intro-model">
        <Model />
      </div>

      <h1 className="intro-title">
        Formula 1 <p>Statistics</p>
      </h1>
      <div className="intro-div"></div>
      <div className="intro-description">
        <p>
          This is a simple web application that displays Formula 1 data using
          React and the OpenF1 API.
        </p>
        <p>
          The data is fetched from the OpenF1 API and displayed in table and
          chart format.
        </p>
        <p>The model above is Carlos Sainz Jr.'s SF23. Enjoy!</p>
      </div>
    </div>
  );
};

export default Intro;
