import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { newSymbol } from './utils/symbol';

const Markets = () => {
  const dispatch = useDispatch();
  const [financialModelData, setFinancialModelData] = useState([]);
  const handlesymbol = (symbol) => {
    dispatch(newSymbol(symbol));
  };
  const DarkMode = useSelector(store => store.theme.isDarkMode);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    setIsDarkMode(DarkMode);
  }, [DarkMode]);

  useEffect(() => {
    const dummyData = [
      { symbol: 'GOLD', price: 1842.5, change: -12.3, changesPercentage: '-0.66%' },
      { symbol: 'BTC', price: 30842.15, change: +456.35, changesPercentage: '+1.50%' },
      { symbol: 'WTI', price: 72.15, change: +1.25, changesPercentage: '+1.76%' },
      { symbol: 'AXP', price: 145.25, change: -2.10, changesPercentage: '-1.42%' },
      { symbol: 'SP', price: 4382.15, change: +35.25, changesPercentage: '+0.81%' },
      { symbol: 'AAPL', price: 178.25, change: +2.45, changesPercentage: '+1.39%' },
      { symbol: 'IBM', price: 131.15, change: -1.85, changesPercentage: '-1.39%' },
      { symbol: 'PRAA', price: 36.25, change: +0.75, changesPercentage: '+2.11%' },
      { symbol: 'PAAS', price: 23.15, change: +0.55, changesPercentage: '+2.43%' },
      { symbol: 'LVCLY', price: 13.45, change: -0.25, changesPercentage: '-1.82%' }
    ];
    setFinancialModelData(dummyData);
  }, []);

  const getTextColor = (percentage) => {
    let strPercentage = String(percentage);
    if (strPercentage.startsWith('+')) {
      return 'text-green-900 bg-green-400 ';
    } else if (strPercentage.startsWith('-')) {
      return 'text-red-900 bg-red-400  ';
    } else {
      return 'text-green-500 ';
    }
  };

  return financialModelData.length < 10 ? <Loading /> : (
    <div className={`market rounded-lg mt-10 p-8 m-5 w-[450px] hover:scale-110 transition-transform ${isDarkMode ? 'bg-black hover:bg-slate-900' : 'bg-gray-300'} 
         max-sm:m-1  max-xl:w-[400px]`}>
      <div className='flex flex-row my-1 '>
        <h1 className='font-medium w-1/4 '>Markets</h1>
        <h1 className='font-medium w-1/4 text-center'>Price</h1>
        <h1 className='w-1/4 text-center max-xl:hidden'>Changes</h1>
        <span className='w-1/4 text-right'>% Changes</span>
      </div>
      <div className='mt-7'>
        {financialModelData.map((data) => (
          <div
            key={data.symbol}
            className='flex flex-row my-1 cursor-pointer'
            onClick={() => handlesymbol(data.symbol)}
          >
            <h1 className='font-medium w-1/4'>{data.symbol}</h1>
            <h1 className='w-1/4 text-center'>{data.price}</h1>
            <h1 className='w-1/4 text-center max-xl:hidden'>{data.change}</h1>
            <span className={`w-1/6 ml-5 text-right p-[2px] pr-[4px] rounded-lg max-sm:w-1/4  ${getTextColor(data.changesPercentage)}`}>
              {data.changesPercentage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Markets;
