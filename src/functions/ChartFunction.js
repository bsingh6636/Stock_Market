


export const fetchStockData = async (symbol, interval) => {
 const apiKey = 'YV71V1YNUTSZU2YV';
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_${interval}_ADJUSTED&symbol=${symbol}&outputsize=10&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data[`${interval} Adjusted Time Series`]
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
};
export const fetchStockDataIntra = async (symbol, interval) => {
  const apiKey = 'YV71V1YNUTSZU2YV';
   const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${apiKey}`;
   try {
     const response = await fetch(url);
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     const data = await response.json();
      return data[`Time Series (5min)`]
   } catch (error) {
     console.error('Failed to fetch data:', error);
     return null;
   }
 };


export const processData = (data) => {
  // Convert data into an array of objects with date and close price
  const dataArray = Object.keys(data).map(date => ({
    date: date,
    close: parseFloat(data[date]['4. close'])
  }));
 
  // Keep only the last 100 data points
  const last100Data = dataArray.slice(0, 100);
  return last100Data;
};

