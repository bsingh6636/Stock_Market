import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { fetchStockData, fetchStockDataIntra, processData } from '../functions/ChartFunction';
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
import { useSelector } from 'react-redux';
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
);
const RealTimeChart = () => {
  const [interval, setInterval] = useState("Intraday")
  const [symbol,setSymbol] =useState("AAPL")
  const storedSymbol = useSelector(store => store.symbol.symbol);
  const DarkMode = useSelector(store => store.theme.isDarkMode)
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
      setIsDarkMode(DarkMode)
  
    }, [DarkMode]);
  useEffect(() => {
    console.log(storedSymbol)
    setSymbol(storedSymbol);
  }, [storedSymbol]);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: ` ${symbol}`,
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
      console.log("not intra")
      const rawData = await fetchStockData(symbol, interval)
      console.log(rawData)
      if (rawData) {
        const processedData = processData(rawData);
        console.log(processedData)
        console.log('here')
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

    const fetchDataIntra = async () => {
      console.log(" intra")
      const rawData = await fetchStockDataIntra(symbol, interval)
      console.log(rawData)
      if (rawData) {
        const processedData = processData(rawData);
        console.log(processedData)
        console.log('here')
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

    interval == "Intraday" ? fetchDataIntra() : fetchData()

  }, [interval,symbol]);
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

  const timeUnit = getTimeUnit("1Y");
  return (
    <div className={`w-[700px] h-[420px] rounded-lg mx-5 p-5 m-10  hover:scale-110 transition-transform ${isDarkMode ? 'bg-black' : 'bg-gray-300' }`}>
      <Line className='cursor-pointer'
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
            duration: 3000, // Animation duration in milliseconds
          },
        }}
      />
      <div className='flex m-5 justify-around pb-2'>
      {console.log(interval)}
      <h1 
        className={`mx-2 cursor-pointer ${interval === "Intraday" ? "bg-blue-500 text-white p-2 rounded-lg" : "bg-transparent"}`} 
        onClick={() => setInterval("Intraday")}
      >
        Daily
      </h1>
      <h1 
        className={`mx-2 cursor-pointer ${interval === "Weekly" ? "bg-blue-500 text-white p-2 rounded-lg" : "bg-transparent"}`} 
        onClick={() => setInterval("Weekly")}
      >
        Weekly
      </h1>
      <h1 
        className={`mx-2 cursor-pointer ${interval === "Monthly" ? "bg-blue-500  text-white p-2 rounded-lg" : "bg-transparent"}`} 
        onClick={() => setInterval("Monthly")}
      >
        Monthly
      </h1>
    </div>
     
    </div>
  );
};

export default RealTimeChart;
