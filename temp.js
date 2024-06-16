import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { fetchStockData, processData } from '../functions/Chart';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
);
const RealTimeChart = ({ symbol ,interval }) => {
    console.log(symbol,interval)
    const [data, setData] = useState({
      labels: [],
      datasets: [
        {
          label: 'Stock Price',
          data: [],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
          tension: 0.1,
        },
      ],
    });

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetchStockData(symbol,interval);
      if (rawData) {
        const processedData = processData(rawData);
        console.log(processedData)
        const labels = processedData.map(item => item.date);
        const closePrices = processedData.map(item => item.close);

        setData({
          labels: labels,
          datasets: [
            {
              ...data.datasets[0],
              data: closePrices,
            },
          ],
        });
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000); // Fetch data every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [symbol, interval]);
  const getTimeUnit = (interval) => {
    switch (interval) {
      case '1D':
        return 'hour';
      case '1W':
      case '1M':
        return 'day';
      case '3M':
      case '1Y':
        return 'month';
      case 'All':
        return 'year';
      default:
        return 'day';
    }
  };

  const timeUnit = getTimeUnit(interval);
  return (
    <div>
      <Line
        data={data}
        options={{
          scales: {
            x: {
              type: 'time',
              time: {
                unit: timeUnit,
              },
            },
            y: {
              beginAtZero: false,
            },
          },
          animation: {
            duration: 2000, // Animation duration in milliseconds
          },
        }}
      />
    </div>
  );
};

export default RealTimeChart;
