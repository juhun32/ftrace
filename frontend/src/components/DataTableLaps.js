import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTableLaps = () => {
  const [data, setData] = useState(null); // Start with null to check if data is loaded
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data/laps');
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(data.driver_number)

  // Check if data is valid and present
  if (!data || !data.driver_number) {
    return <div>No data available</div>;
  }

  // Convert the object to an array using Object.keys or Object.entries
  const rows = Object.keys(data.driver_number).map((key) => ({
    number: data.driver_number[key],
    duration: data.lap_duration[key],

  }));

  return (
    <div>
      <h2>Data Table Laps</h2>
      <table>
        <thead>
          <tr>
            <th>number</th>
            <th>duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.number}</td>
              <td>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableLaps;
