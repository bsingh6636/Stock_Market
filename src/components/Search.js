import React, { useRef, useState } from 'react';

const Search = () => {
  const [symbol, setSymbol] = useState('');
  const value = useRef(null)
  const [stockData, setStockData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setStockData(null);

    try {
        
      const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${value.current.value}&apikey=G7PFMT0M3J99LLLP`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      const data = await response.json();
      setStockData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="stock-info-container ml-[200px] rounded-3xl bg-gray-800 mt-20 m-5 p-10 items-center flex flex-col justify-center h-[700px] ">
     <div className='mt-[-350px]'>
     <form onSubmit={handleSubmit}>
        <input
          type="text" value={symbol} onChange={handleChange} ref={value} placeholder="Enter symbol (e.g AAPL)"
          required className='m-3 p-3 rounded-lg text-black w-64 h-16'
        />
        <button type="submit" className='m-3 p-3 h-16 rounded-lg bg-green-300'>Get Stock Info</button>
      </form>

     </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {stockData && (
        <div className=" shadow-md rounded-lg overflow-hidden  mx-auto my-5 p-6">
        <h2 className="text-center text-xl font-bold mb-4">{stockData.Name} ({stockData.Symbol})</h2>
        <p className="mb-4">{stockData.Description}</p>
        <ul className="list-disc pl-5 space-y-2">
  <li className="flex items-center">
    <strong className="flex-shrink-0 w-40">Asset Type:</strong>
    <span>{stockData.AssetType}</span>
  </li>
  <li className="flex items-center">
    <strong className="flex-shrink-0 w-40">Exchange:</strong>
    <span>{stockData.Exchange}</span>
  </li>
  <li className="flex items-center">
    <strong className="flex-shrink-0 w-40">Currency:</strong>
    <span>{stockData.Currency}</span>
  </li>
  <li className="flex items-center">
    <strong className="flex-shrink-0 w-40">Sector:</strong>
    <span>{stockData.Sector}</span>
  </li>
  <li className="flex items-center">
    <strong className="flex-shrink-0 w-40">Industry:</strong>
    <span>{stockData.Industry}</span>
  </li>
  <li className="flex items-center">
    <strong className="flex-shrink-0 w-40">Market Capitalization:</strong>
    <span>{stockData.MarketCapitalization}</span>
  </li>
  <li className="flex items-center">
    <strong className="flex-shrink-0 w-40">Dividend Per Share:</strong>
    <span>{stockData.DividendPerShare}</span>
  </li>
  <li className="flex items-center">
    <strong className="flex-shrink-0 w-40">EPS:</strong>
    <span>{stockData.EPS}</span>
  </li>
  <li className="flex items-center">
    <strong className="flex-shrink-0 w-40">52 Week High:</strong>
    <span>{stockData['52WeekHigh']}</span>
  </li>
  <li className="flex items-center">
    <strong className="flex-shrink-0 w-40">52 Week Low:</strong>
    <span>{stockData['52WeekLow']}</span>
  </li>
</ul>


      </div>
      
      )}
    </div>
  );
}

export default Search;
