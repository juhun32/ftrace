import React, { useEffect, useState } from 'react';

import axios from "axios";

const Next = () => {
    const [session, setSession] = useState([]);
  const [selectedYear, setYear] = useState("All");

  useEffect(() => {
    // Fetch session from the Flask backend
    axios
      .get("https://flask-api-97721989316.us-east1.run.app/sessions?year=2024")
      .then((response) => {
        setSession(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  const filteredSessions =
    selectedYear === "All"
      ? session
      : session.filter((year) => year.year === selectedYear);

  return (
    <div>
      <h1>F1 session, Latest Session</h1>

      <select className="session-select"
        value={selectedYear}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="All">All Years</option>
        {Array.from(new Set(session.map((year) => year.year)))
          .filter(Boolean)
          .map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>

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
            {filteredSessions.map((year) => (
              <tr
                key={year.year_number}
                
              >
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

export default Next;