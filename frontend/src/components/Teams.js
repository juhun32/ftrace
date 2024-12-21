import React from 'react';

const Teams = () => {
    const teamsData = [
        {
            name: 'Mercedes',
            wins: 115,
            championships: 8,
            drivers: ['Lewis Hamilton', 'George Russell'],
            points: 5735
        },
        {
            name: 'Red Bull Racing',
            wins: 75,
            championships: 4,
            drivers: ['Max Verstappen', 'Sergio Perez'],
            points: 4135
        },
        {
            name: 'Ferrari',
            wins: 238,
            championships: 16,
            drivers: ['Charles Leclerc', 'Carlos Sainz'],
            points: 8500
        },
        {
            name: 'McLaren',
            wins: 183,
            championships: 8,
            drivers: ['Lando Norris', 'Daniel Ricciardo'],
            points: 5800
        },
        {
            name: 'Alpine',
            wins: 21,
            championships: 2,
            drivers: ['Fernando Alonso', 'Esteban Ocon'],
            points: 1500
        },
        {
            name: 'AlphaTauri',
            wins: 2,
            championships: 0,
            drivers: ['Pierre Gasly', 'Yuki Tsunoda'],
            points: 300
        },
        {
            name: 'Aston Martin',
            wins: 0,
            championships: 0,
            drivers: ['Sebastian Vettel', 'Lance Stroll'],
            points: 200
        },
        {
            name: 'Williams',
            wins: 114,
            championships: 9,
            drivers: ['Nicholas Latifi', 'Alex Albon'],
            points: 4000
        },
        {
            name: 'Alfa Romeo',
            wins: 10,
            championships: 2,
            drivers: ['Valtteri Bottas', 'Guanyu Zhou'],
            points: 500
        },
        {
            name: 'Haas',
            wins: 0,
            championships: 0,
            drivers: ['Mick Schumacher', 'Kevin Magnussen'],
            points: 100
        }
    ];

    return (
        <div>
            <h1>F1 Teams</h1>
            <ul>
                {teamsData.map((team, index) => (
                    <li key={index}>
                        <h2>{team.name}</h2>
                        <p>Wins: {team.wins}</p>
                        <p>Championships: {team.championships}</p>
                        <p>Drivers: {team.drivers.join(', ')}</p>
                        <p>Total Points: {team.points}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Teams;