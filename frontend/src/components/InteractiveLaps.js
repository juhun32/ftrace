import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const InteractiveLaps = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(""); // To store the selected driver

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data/laps');
        setData(response.data); // Set the raw data here
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle driver selection
  const handleDriverChange = (e) => {
    setSelectedDriver(e.target.value);
  };

  // Prepare chart data based on the selected driver
  const getChartData = () => {
    if (!data || !selectedDriver) {
      return null; // Return nothing if no driver is selected or data isn't loaded
    }

    // Filter data for the selected driver and remove NaN lap times
    const driverData = Object.entries(data.driver_number)
      .filter(([key, value]) => value === Number(selectedDriver) && !isNaN(data.lap_duration[key]))
      .map(([key]) => ({
        lapNumber: key,
        lapDuration: data.lap_duration[key],
      }));

    // Return chart data
    return {
      labels: driverData.map((d) => `Lap ${d.lapNumber}`), // Lap numbers on the X-axis
      datasets: [
        {
          label: `Lap Times for Driver ${selectedDriver}`,
          data: driverData.map((d) => d.lapDuration), // Lap durations on Y-axis
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Get all unique driver numbers for the dropdown
  const driverOptions = [...new Set(Object.values(data.driver_number))];

  return (
    <div>
      <h2>Interactive Lap Time Graph</h2>

      {/* Dropdown to select the driver */}
      <select value={selectedDriver} onChange={handleDriverChange}>
        <option value="">Select Driver</option>
        {driverOptions.map((driver, index) => (
          <option key={index} value={driver}>
            Driver {driver}
          </option>
        ))}
      </select>

      {/* Render the graph if data is available */}
      {selectedDriver && getChartData() && (
        <Bar data={getChartData()} />
      )}
    </div>
  );
};

export default InteractiveLaps;
