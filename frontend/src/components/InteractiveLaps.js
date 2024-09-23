// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const InteractiveLaps = () => {
//   const [data, setData] = useState(null);  // Initial state is null
//   const [error, setError] = useState(null);
//   const [selectedDriver, setSelectedDriver] = useState(""); // To store the selected Driver

//   useEffect(() => {
//     // Fetch data when the component mounts
//     axios.get('http://localhost:5000/api/data/laps')
//       .then((response) => {

//         // console.log(response.data.driver_number);
//         if (response.data) {
//           setData(response.data);
//         } else {
//           setError('No data found');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setError('Error fetching data');
//       });
//   }, []);

//   // Handle undefined or null data case
//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!data) {
//     return <p>Loading...</p>;
//   }

//   // Safely handle Object.values by ensuring data is not null/undefined
//   const driverNumbers = data.driver_number ? Object.values(data.driver_number) : [];
//   const lapDurations = data.lap_duration ? Object.values(data.lap_duration) : [];

//   const chartData = driverNumbers.map((driver, index) => ({
//     driver,
//     lapDuration: lapDurations[index] || null, // Handle potential null values in lapDuration
//   }));

//   const rows = Object.keys(data.driver_number).map((key) => ({
//     driver: data.driver_number[key],
//     laptime: data.lap_duration[key],
//   }));

//   return (
//     <div>
//       <h2>Data Table Sessions</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>driver</th>
//             <th>laptime</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>
//               <td>{row.driver}</td>
//               <td>{row.laptime}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InteractiveLaps;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";
import "../css/laps.css";

const InteractiveLaps = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(""); // To store the selected driver

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data/laps");
        setData(response.data);
      } catch (err) {
        setError("Failed to load data");
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
    if (!data || !selectedDriver) return null;

    // Filter data for the selected driver
    const driverData = Object.keys(data.driver_number)
      .filter((key) => data.driver_number[key] == selectedDriver)
      .map((key) => data.lap_duration[key]);

    return {
      labels: driverData.map((_, i) => `Lap ${i + 1}`), // Lap labels
      datasets: [
        {
          label: `Lap times for Driver ${selectedDriver}`,
          data: driverData,
          backgroundColor: "rgba(75,192,192,0.6)",
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Get unique driver numbers for the dropdown
  const driverOptions = [...new Set(Object.values(data.driver_number))];
  const driverNumbers = data.driver_number
    ? Object.values(data.driver_number)
    : [];
  const lapDurations = data.lap_duration
    ? Object.values(data.lap_duration)
    : [];

  const combinedData = driverNumbers.map((driver, index) => ({
    driver,
    lapDuration: lapDurations[index] || "N/A", // Handle potential null values in lapDuration
  }));

  const filteredData = selectedDriver
    ? combinedData.filter((item) => item.driver === parseInt(selectedDriver))
    : [];

  return (
    <div>
      {/* Dropdown to select driver */}
      <select value={selectedDriver} onChange={handleDriverChange}>
        <option value="">Select Driver</option>
        {driverOptions.map((driver, index) => (
          <option key={index} value={driver}>
            Driver {driver}
          </option>
        ))}
      </select>

      <div className="graph">
        <h2>Laptime graph</h2>
        {/* Render graph if data is available */}
        {selectedDriver && getChartData() && <Line data={getChartData()} />}
      </div>

      <div className="laps_table_div">
        {/* table */}

        {/* Dropdown for selecting a driver */}
        {/* <select
        onChange={(e) => setSelectedDriver(e.target.value)}
        value={selectedDriver || ""}
      >
        <option value="">Select Driver</option>
        {[...new Set(driverNumbers)].map((driver, index) => (
          <option key={index} value={driver}>
            Driver {driver}
          </option>
        ))}
      </select> */}

        {/* Display the table only if a driver is selected */}
        {selectedDriver && filteredData.length > 0 ? (
          <table className="laps_table">
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
    </div>
  );
};

export default InteractiveLaps;
