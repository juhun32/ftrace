import React from "react";
import "../css/Intro.css";

const Intro = () => {
  return (
    <div className="intro-container">
      <h1 className="intro-title">Formula 1 Statistics</h1>
      <p>
        This is a simple web application that displays Formula 1 data using
        React and the OpenF1 API.
      </p>
      <p>
        The data is fetched from the OpenF1 API and displayed in a table and
        chart.
      </p>
    </div>
  );
};

export default Intro;
