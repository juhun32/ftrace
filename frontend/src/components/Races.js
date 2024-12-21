import React, { useEffect, useState } from 'react';

const Races = () => {
    const [races, setRaces] = useState([]);

    useEffect(() => {
        fetchRaces();
    }, []);

    const fetchRaces = async () => {
        try {
            const response = await fetch('https://api.example.com/races');
            const data = await response.json();
            setRaces(data);
        } catch (error) {
            console.error('Error fetching races:', error);
        }
    };

    return (
        <div>
            <h1>F1 Races</h1>
            <ul>
                {races.map((race) => (
                    <li key={race.id}>
                        {race.name} - {race.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Races;