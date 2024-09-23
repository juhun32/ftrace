import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverLapTable = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);  // Track the selected driver

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://localhost:5000/api/data/laps')  // Replace with actual API URL
      .then((response) => {
        // console.log(response.data);
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

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  // Safely handle Object.values by ensuring data is not null/undefined
  const driverNumbers = data.driver_number ? Object.values(data.driver_number) : [];
  const lapDurations = data.lap_duration ? Object.values(data.lap_duration) : [];

  console.log(data);

  // Combine driver numbers and lap durations into a format suitable for the table
  const combinedData = driverNumbers.map((driver, index) => ({
    driver,
    lapDuration: lapDurations[index] || 'N/A', // Handle potential null values in lapDuration
  }));

  // Filter data based on selected driver
  const filteredData = selectedDriver
    ? combinedData.filter(item => item.driver === parseInt(selectedDriver))
    : [];

  return (
    <div>
      <h2>Laptime Table</h2>

      {/* Dropdown for selecting a driver */}
      <select onChange={(e) => setSelectedDriver(e.target.value)} value={selectedDriver || ''}>
        <option value="">Select Driver</option>
        {[...new Set(driverNumbers)].map((driver, index) => (
          <option key={index} value={driver}>
            Driver {driver}
          </option>
        ))}
      </select>

      {/* Display the table only if a driver is selected */}
      {selectedDriver && filteredData.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Lap Number</th>
              <th>Lap Duration (seconds)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>Lap {index + 1}</td>
                <td>{item.lapDuration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Please select a driver to view lap times.</p>
      )}
    </div>
  );
};

export default DriverLapTable;
