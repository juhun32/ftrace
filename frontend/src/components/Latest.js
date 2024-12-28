import React, { useEffect, useState } from 'react';

const Latest = () => {
    const [latestData, setLatestData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/data/latest')
            .then(response => response.json())
            .then(data => setLatestData(data))
            .catch(error => console.error('Error fetching latest data:', error));
    }, []);

    if (!latestData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Latest Statistics</h1>
            <ul>
                {latestData.map((item, index) => (
                    <li key={index}>{item.circuit_short_name}: {item.meeting_official_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Latest;