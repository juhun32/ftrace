import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTableSessions = () => {
  const [data, setData] = useState(null); // Start with null to check if data is loaded
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data/sessions');
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

  // Check if data is valid and present
  if (!data || !data.country_name) {
    return <div>No data available</div>;
  }

  // Convert the object to an array using Object.keys or Object.entries
  const rows = Object.keys(data.country_name).map((key) => ({
    country: data.country_name[key],
    circuit: data.circuit_short_name[key],
    dateStart: data.date_start[key],
    dateEnd: data.date_end[key],
  }));

  return (
    <div>
      <h2>Data Table Sessions</h2>
      <table border="">
        <thead>
          <tr>
            <th>Country</th>
            <th>Circuit</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.country}</td>
              <td>{row.circuit}</td>
              <td>{row.dateStart}</td>
              <td>{row.dateEnd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableSessions;
