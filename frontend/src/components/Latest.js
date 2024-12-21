import React, { useEffect, useState } from 'react';

const Latest = () => {
    const [latestData, setLatestData] = useState(null);

    useEffect(() => {
        fetch('https://api.example.com/latest')
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
                    <li key={index}>{item.name}: {item.value}</li>
                ))}
            </ul>
        </div>
    );
};

export default Latest;