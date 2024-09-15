import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const DataChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        const data = response.data;

        // Assuming your data has 'date' and 'value' fields
        const labels = data.map((item) => item.date);
        const values = data.map((item) => item.value);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Data Chart",
              data: values,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Data Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DataChart;
