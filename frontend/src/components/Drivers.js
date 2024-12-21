import React from "react";

const Drivers = () => {
  const driverDetails = [
    { name: "Lewis Hamilton", wins: 100, races: 270, team: "Mercedes" },
    { name: "Max Verstappen", wins: 20, races: 130, team: "Red Bull Racing" },
    { name: "Valtteri Bottas", wins: 10, races: 160, team: "Mercedes" },
    { name: "Sergio Perez", wins: 2, races: 200, team: "Red Bull Racing" },
    { name: "Charles Leclerc", wins: 2, races: 80, team: "Ferrari" },
    { name: "Carlos Sainz", wins: 0, races: 120, team: "Ferrari" },
    { name: "Lando Norris", wins: 0, races: 50, team: "McLaren" },
    { name: "Daniel Ricciardo", wins: 8, races: 190, team: "McLaren" },
    { name: "Pierre Gasly", wins: 1, races: 70, team: "AlphaTauri" },
    { name: "Fernando Alonso", wins: 32, races: 310, team: "Alpine" },
    { name: "Esteban Ocon", wins: 1, races: 80, team: "Alpine" },
    { name: "Sebastian Vettel", wins: 53, races: 270, team: "Aston Martin" },
    { name: "Lance Stroll", wins: 0, races: 90, team: "Aston Martin" },
    { name: "Yuki Tsunoda", wins: 0, races: 20, team: "AlphaTauri" },
    { name: "Kimi Raikkonen", wins: 21, races: 350, team: "Alfa Romeo" },
    { name: "Antonio Giovinazzi", wins: 0, races: 50, team: "Alfa Romeo" },
    { name: "Mick Schumacher", wins: 0, races: 20, team: "Haas" },
    { name: "Nikita Mazepin", wins: 0, races: 20, team: "Haas" },
    { name: "George Russell", wins: 0, races: 50, team: "Williams" },
    { name: "Nicholas Latifi", wins: 0, races: 30, team: "Williams" },
  ];
  return (
    <div>
      <h1>F1 Drivers</h1>
      <ul>
        {driverDetails.map((driver, index) => (
          <li key={index}>
            {driver.name} - Wins: {driver.wins}, Races: {driver.races}, Team:{" "}
            {driver.team}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drivers;
