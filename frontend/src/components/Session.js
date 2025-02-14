import React, { useEffect, useState } from "react";
import axios from "axios";

const Session = () => {
  const [session, setSession] = useState([]);
  const [selectedYear, setYear] = useState("2023");

  useEffect(() => {
    // Fetch session from the Flask backend
    axios
      .get(`https://api.openf1.org/v1/sessions?year=${selectedYear}`)
      .then((response) => {
        setSession(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, [selectedYear]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-5rem)] p-10">
      <h1>F1 session, Latest Session</h1>

      <select
        className="session-select"
        value={selectedYear}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>

      <div className="flex-row justify-center items-center">
        <table>
          <tbody className="flex flex-col gap-5">
            {Object.entries(
              session.reduce((acc, sessionInfo) => {
                if (!acc[sessionInfo.location]) {
                  acc[sessionInfo.location] = [];
                }
                acc[sessionInfo.location].push(sessionInfo);
                return acc;
              }, {})
            ).map(([location, sessions]) => (
              <tr key={location}>
                <td>{location}</td>
                <td className="flex gap-10">
                  {sessions.map((sessionInfo) => {
                    const date = new Date(sessionInfo.date_start);
                    const formattedDate = `${date.getFullYear()}-${String(
                      date.getMonth() + 1
                    ).padStart(2, "0")}-${String(date.getDate()).padStart(
                      2,
                      "0"
                    )}`;
                    const formattedTime = `${String(date.getHours()).padStart(
                      2,
                      "0"
                    )}:${String(date.getMinutes()).padStart(2, "0")}`;
                    
                    return (
                      <div
                        key={sessionInfo.session_key}
                        className="flex flex-col justify-center items-center border-2 border-gray-300 rounded-lg p-2"
                      >
                        <p>{sessionInfo.session_name}</p>
                        <p>{formattedDate}</p>
                        <p>{formattedTime}</p>
                      </div>
                    );
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Session;
