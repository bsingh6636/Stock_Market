


export const fetchStockData = async (symbol, interval) => {

 
  const apiKey = 'YV71V1YNUTSZU2YV';
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_${interval}_ADJUSTED&symbol=${symbol}&outputsize=10&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(interval)
    console.log(data)
    console.log("data",data[`${interval} Adjusted Time Series`])
    return data[`${interval} Adjusted Time Series`]
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
 
  
};


export const processData = (data) => {
  console.log('processing data')
  // Convert data into an array of objects with date and close price
  const dataArray = Object.keys(data).map(date => ({
    date: date,
    close: parseFloat(data[date]['4. close'])
  }));
  console.log(dataArray)
  // Keep only the last 100 data points
  const last100Data = dataArray.slice(0, 100);
  console.log('processed data')
  return last100Data;
};

