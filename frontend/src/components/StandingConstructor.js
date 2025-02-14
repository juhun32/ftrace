import React, { useEffect, useState } from "react";

const StandingConstructor = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/constructorStandings.json")
      .then((response) => response.json())
      .then((data) =>
        setStandings(
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        )
      )
      .catch((error) =>
        console.error("Error fetching constructor standings:", error)
      );
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <h2>Constructor Standings</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Constructor</th>
            <th>Points</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index) => (
            <tr key={index}>
              <td>{standing.position}</td>
              <td>{standing.Constructor.name}</td>
              <td>{standing.points}</td>
              <td>{standing.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingConstructor;
