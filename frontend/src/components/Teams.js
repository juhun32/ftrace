import React from "react";
import "../css/Teams.css";

const Teams = () => {
  const teamsData = [
    {
      name: "Mercedes",
      wins: 115,
      championships: 8,
      driver1: "Lewis Hamilton",
      driver2: "George Russell",
      points: 5735,
    },
    {
      name: "Red Bull Racing",
      wins: 75,
      championships: 4,
      driver1: "Max Verstappen",
      driver2: "Sergio Perez",
      points: 4135,
    },
    {
      name: "Ferrari",
      wins: 238,
      championships: 16,
      driver1: "Charles Leclerc",
      driver2: "Carlos Sainz",
      points: 8500,
    },
    {
      name: "McLaren",
      wins: 183,
      championships: 8,
      driver1: "Lando Norris",
      driver2: "Daniel Ricciardo",
      points: 5800,
    },
    {
      name: "Alpine",
      wins: 21,
      championships: 2,
      driver1: "Fernando Alonso",
      driver2: "Esteban Ocon",
      points: 1500,
    },
    {
      name: "AlphaTauri",
      wins: 2,
      championships: 0,
      driver1: "Pierre Gasly",
      driver2: "Yuki Tsunoda",
      points: 300,
    },
    {
      name: "Aston Martin",
      wins: 0,
      championships: 0,
      driver1: "Sebastian Vettel",
      driver2: "Lance Stroll",
      points: 200,
    },
    {
      name: "Williams",
      wins: 114,
      championships: 9,
      driver1: "Nicholas Latifi",
      driver2: "Alex Albon",
      points: 4000,
    },
    {
      name: "Alfa Romeo",
      wins: 10,
      championships: 2,
      driver1: "Valtteri Bottas",
      driver2: "Guanyu Zhou",
      points: 500,
    },
    {
      name: "Haas",
      wins: 0,
      championships: 0,
      driver1: "Mick Schumacher",
      driver2: "Kevin Magnussen",
      points: 100,
    },
  ];

  return (
    <div>
      <h1>F1 Teams</h1>
      <table className="teams">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Wins</th>
            <th>Championships</th>
            <th>Drivers</th>
            <th> </th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {teamsData.map((team, index) => (
            <tr key={index}>
              <td>{team.name}</td>
              <td>{team.wins}</td>
              <td>{team.championships}</td>
              <td>{team.driver1}</td>
              <td>{team.driver2}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;
