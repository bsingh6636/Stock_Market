import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { useSelector } from 'react-redux';

const SectorPerformance = () => {
  const DarkMode = useSelector(store => store.theme.isDarkMode);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    setIsDarkMode(DarkMode);
  }, [DarkMode]);

  const [sectorPerformance, setSectorPerformance] = useState([
    { sector: 'Technology', changesPercentage: '+1.25%' },
    { sector: 'Healthcare', changesPercentage: '-0.80%' },
    { sector: 'Financials', changesPercentage: '+0.60%' },
    { sector: 'Energy', changesPercentage: '-2.15%' },
    { sector: 'Consumer Discretionary', changesPercentage: '+1.05%' },
    { sector: 'Industrials', changesPercentage: '+0.45%' },
    { sector: 'Utilities', changesPercentage: '-0.50%' },
    { sector: 'Materials', changesPercentage: '+0.30%' },
    { sector: 'Real Estate', changesPercentage: '-1.20%' },
    { sector: 'Consumer Staples', changesPercentage: '+0.75%' }
  ]);

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
      return 'text-green-500';
    } else if (percentage.startsWith('-')) {
      return 'text-red-600';
    } else {
      return 'text-green-500';
    }
  };

  return !sectorPerformance ? (
    <Loading />
  ) : (
    <div className={`sectorPerformance rounded-lg p-5 w-auto max-w-4xl mx-auto mt-10 hover:scale-110 transition-transform ${isDarkMode ? 'bg-black' : 'bg-gray-300  '}
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
