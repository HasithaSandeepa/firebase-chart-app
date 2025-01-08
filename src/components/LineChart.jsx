import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import "chart.js/auto";

// Firebase configuration
const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<AUTH_DOMAIN>",
  databaseURL: "<DATABASE_URL>",
  projectId: "<PROJECT_ID>",
  storageBucket: "<STORAGE_BUCKET>",
  messagingSenderId: "<MESSAGING_SENDER_ID>",
  appId: "<APP_ID>",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const LineChart = () => {
  const [tempChartData, setTempChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  });

  const [humChartData, setHumChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Humidity (%)",
        data: [],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  });

  useEffect(() => {
    const dataRef = ref(database, "Sensor1/Readings");

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const timestamps = [];
      const temperatures = [];
      const humidities = [];
      const temperatureVariances = [];
      const humidityVariances = [];

      let prevTemperature = null;
      let prevHumidity = null;

      for (let key in data) {
        timestamps.push(key); // Capture date-time from key
        const currentTemperature = data[key].Temperature;
        const currentHumidity = data[key].Humidity;

        temperatures.push(currentTemperature);
        humidities.push(currentHumidity);

        // Calculate variance
        temperatureVariances.push(
          prevTemperature !== null
            ? Math.abs(currentTemperature - prevTemperature)
            : 0
        );
        humidityVariances.push(
          prevHumidity !== null ? Math.abs(currentHumidity - prevHumidity) : 0
        );

        prevTemperature = currentTemperature;
        prevHumidity = currentHumidity;
      }

      setTempChartData({
        labels: timestamps,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatures,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            tension: 0.1,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      });

      setHumChartData({
        labels: timestamps,
        datasets: [
          {
            label: "Humidity (%)",
            data: humidities,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            tension: 0.1,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      });
    });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", display: "flex" }}>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <h2>Temperature Trends with Variance</h2>
        <Line data={tempChartData} />
      </div>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <h2>Humidity Trends with Variance</h2>
        <Line data={humChartData} />
      </div>
    </div>
  );
};

export default LineChart;
