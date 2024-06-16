import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { fetchStockData, processData } from '../functions/ChartFunction';
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
const RealTimeChart = ({ symbol  }) => {
  const [interval,setInterval] = useState("INTRADAY")
  // const [rawData,setRawData] = useState(null)

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
      console.log(interval)
       const rawData =await fetchStockData(symbol,interval)
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

     
    fetchData();
   
  }, [interval]);
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
    <div className='w-[700px] h-[400px] bg-black rounded-lg mx-5 p-5 m-10  '>
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
        <h1 className={`mx-2 cursor-pointer`} onClick={()=>setInterval("INTRADAY")} >Daily</h1>
        <h1 className='mx-2 cursor-pointer' onClick={()=>setInterval("Weekly")}>Weekly</h1>
        <h1 className='mx-2 cursor-pointer' onClick={()=>setInterval("Monthly")}>Monthly</h1>
      </div>
    </div>
  );
};

export default RealTimeChart;
