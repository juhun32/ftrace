import React from "react";
import "../css/StandingDriver.css";

import mockdata from "../mockdata/driver_standing.json";

const StandingDriver = () => {
  // Example driver data for the 2024 season
  const f1Drivers2024 = mockdata;

  return (
    <div className="driver-standings flex flex-col justify-center items-center p-10">
      {f1Drivers2024.map((driver, index) => (
        <div key={index} className="flex gap-5">
          <h2>{driver.name}</h2>
          <p>Position: {driver.position}</p>
          <p>Points: {driver.points}</p>
          <p>Team: {driver.team}</p>
          <p>Race Wins: {driver.raceWins}</p>
        </div>
      ))}
      display championship win possibility!!!!!!!!!
    </div>
  );
};

export default StandingDriver;
