import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const InteractiveLaps = () => {
  const [data, setData] = useState(null);  // Initial state is null
  const [error, setError] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(""); // To store the selected Driver

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://localhost:5000/api/data/laps')
      .then((response) => {
        
        // console.log(response.data.driver_number);
        if (response.data) {
          setData(response.data);
        } else {
          setError('No data found');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      });
  }, []);

  // Handle undefined or null data case
  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  // Safely handle Object.values by ensuring data is not null/undefined
  const driverNumbers = data.driver_number ? Object.values(data.driver_number) : [];
  const lapDurations = data.lap_duration ? Object.values(data.lap_duration) : [];

  const chartData = driverNumbers.map((driver, index) => ({
    driver,
    lapDuration: lapDurations[index] || null, // Handle potential null values in lapDuration
  }));

  return (
    <div>
      <h1>Interactive Lap Times</h1>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="lapDuration" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="driver" label={{ value: 'Driver Number', position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'Lap Duration (s)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InteractiveLaps;
