import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const DataChart = () => {
  const [chartData, setChartData] = useState([]);  // Initialize as null
  const [loading, setLoading] = useState(true);  // For showing a loading indicator
  const [error, setError] = useState(null);  // For handling errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const data = response.data;

        // Make sure the data is valid and structured
        const labels = data.map((item) => item.date);  // Map over data safely
        const values = data.map((item) => item.value);

        setChartData({
          labels: labels || [],  // Fallback to empty array
          datasets: [
            {
              label: 'Your Data Label',
              data: values || [],  // Fallback to empty array
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);  // Stop loading after the fetch
      }
    };

    fetchData();
  }, []);

  // Show loading spinner or message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if fetching failed
  if (error) {
    return <div>{error}</div>;
  }

  // If no data is available yet (i.e., chartData is null), render nothing
  if (!chartData) {
    return null;
  }

  return (
    <div>
      <h2>Data Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DataChart;
