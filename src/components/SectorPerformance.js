import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { useSelector } from 'react-redux';

const SectorPerformance = () => {
  const DarkMode = useSelector(store => store.theme.isDarkMode);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    setIsDarkMode(DarkMode);
  }, [DarkMode]);

  const [sectorPerformance, setSectorPerformance] = useState(null);

  useEffect(() => {
    const getStockPerformance = async () => {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/sectors-performance?apikey=Mb4yrMh82hd2xdVdxMbZRElvcRQTJGaL`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setSectorPerformance(json.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch sector performance data", error);
      }
    };
    getStockPerformance();
  }, []);

  const getBackgroundColor = (percentage) => {
    if (percentage.startsWith('+')) {
      return 'bg-gradient-to-r from-black via-green-200 to-green-300';
    } else if (percentage.startsWith('-')) {
      return 'bg-gradient-to-r from-red-100 via-red-200 to-red-300';
    } else {
      return 'bg-gradient-to-r from-green-100 via-green-200 to-green-300';
    }
  };

  const getTextColor = (percentage) => {
    if (percentage.startsWith('+')) {
      return 'text-green-900';
    } else if (percentage.startsWith('-')) {
      return 'text-red-600';
    } else {
      return 'text-green-500';
    }
  };

  return !sectorPerformance ? (
    <Loading />
  ) : (
    <div className={`sectorPerformance rounded-lg p-5 w-auto max-w-4xl mx-auto mt-10 hover:scale-110 transition-transform ${isDarkMode ? 'bg-black hover:bg-slate-900' : 'bg-gray-300  '}
     max-sm:ml-[-30px] max-sm:p-1 `}>
      <div className='flex justify-between font-bold mb-8 max-sm:w-72 '>
        <h1 className='font-extrabold'>Sector Performance</h1>
        <h4 className='font-extralight'>% Price Change</h4>
      </div>
      <div className='grid grid-cols-2 gap-x-10 max-sm:w-72 max-sm:flex max-sm:flex-col max-xl:gap-x-5'>
        {sectorPerformance.slice(0, 6).map((data, index) => (
          <div key={index} className='flex justify-between mb-1'>
            <h1 className='m-1 p-1'>{data.sector}</h1>
            <div className={`m-1 p-1 rounded-md ${getBackgroundColor(data.changesPercentage)}`}>
              <h1 className={`w-12 mx-2 text-right ${getTextColor(data.changesPercentage)}`}>{parseFloat(data.changesPercentage).toFixed(2)+'%'}</h1>
            </div>
          </div>
        ))}
        {sectorPerformance.slice(6).map((data, index) => (
          <div key={index} className='flex justify-between mb-1 sectorPerformanceDiv4'>
            <h1 className='m-1 p-1'>{data.sector}</h1>
            <div className={`m-1 p-1 rounded-md ${getBackgroundColor(data.changesPercentage)}`}>
              <h1 className={`w-12 mx-2 text-right ${getTextColor(data.changesPercentage)}`}>{parseFloat(data.changesPercentage).toFixed(2)+'%'}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorPerformance;
