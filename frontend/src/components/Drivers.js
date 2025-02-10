import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Drivers.css";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("All");

  useEffect(() => {
    // Fetch drivers from the Flask backend
    axios
      .get("https://flask-api-97721989316.us-east1.run.app/drivers?session_key=9161&driver_number=1")
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
      });
  }, []);

  const filteredDrivers =
    selectedTeam === "All"
      ? drivers
      : drivers.filter((driver) => driver.team_name === selectedTeam);

  return (
    <div>
      {/* <h1>F1 Drivers, Latest Session</h1> */}

      <select className="drivers-select"
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        <option value="All">All Teams</option>
        {Array.from(new Set(drivers.map((driver) => driver.team_name)))
          .filter(Boolean)
          .map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
      </select>

      <div className="drivers">
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Number</th>
              <th>Name</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver) => (
              <tr
                key={driver.driver_number}
                style={{ backgroundColor: `#${driver.team_color}` }}
                
              >
                <td>
                  <img
                    src={
                      driver.headshot_url || "https://via.placeholder.com/100"
                    }
                    alt={driver.full_name}
                  />
                </td>
                <td>{driver.id}</td>
                <td>{driver.name}</td>
                <td>{driver.team_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drivers;
