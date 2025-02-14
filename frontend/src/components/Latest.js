import React, { useEffect, useState } from "react";
import axios from "axios";

const Latest = () => {
  const [latestSession, setLatestSession] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.openf1.org/v1/sessions?meeting_key=latest")
      .then((response) => {
        setLatestSession(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  return (
    <div>
      latest
      <div className="session">
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>year</th>
            </tr>
          </thead>
          <tbody>
            {latestSession.map((year) => (
              <tr key={year.year_number}>
                <td>{year.id}</td>
                <td>{year.name}</td>
                <td>{year.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Latest;
