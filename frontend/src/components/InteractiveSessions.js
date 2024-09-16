import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const InteractiveSessions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(""); // To store the selected country

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data/sessions');
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

  // Handle country selection
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  // Prepare chart data based on the selected country
  const getChartData = () => {
    if (!data || !selectedCountry) {
      return null; // Return nothing if no country is selected or data isn't loaded
    }

    // Filter data for the selected country
    const countryData = Object.keys(data.country_name)
      .filter((key) => data.country_name[key] === selectedCountry)
      .map((key) => ({
        session_name: data.session_name[key],
        date_start: data.date_start[key],
        date_end: data.date_end[key],
        location: data.location[key],
        session_type: data.session_type[key]
      }));

    return {
      labels: countryData.map((d) => d.session_name), // Session names on the X-axis
      datasets: [
        {
          label: `Sessions for ${selectedCountry}`,
          data: countryData.map((d) => new Date(d.date_end) - new Date(d.date_start)), // Duration of each session_name
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

  // Get all unique country names for the dropdown
  const countryOptions = [...new Set(Object.values(data.country_name))];

  return (
    <div>
      <h2>Interactive Graph</h2>

      {/* Dropdown to select the country */}
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Grand Prix</option>
        {countryOptions.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* Render the graph if data is available */}
      {selectedCountry && getChartData() && (
        <Bar data={getChartData()} />
      )}
    </div>
  );
};

export default InteractiveSessions;
