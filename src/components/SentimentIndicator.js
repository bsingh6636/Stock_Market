import React, { useEffect, useState } from 'react'

const SentimentIndicator = () => {
    const [sentimentData, setSentimentData] = useState({
        title: "Apple, Nvidia Are The Most Overbought Stocks On Wall Street Amid AI Frenzy: Here Are Other Stocks With Potential For Pullback - Apple  ( NASDAQ:AAPL ) , Broadcom  ( NASDAQ:AVGO ) ",
        overall_sentiment_label: "Somewhat-bullish"
    });
   useEffect(() => {
        const getSentiment = async () => {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo`, {
                    json: true,
                    headers: { 'User-Agent': 'request' }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                 setSentimentData(json.feed[5]);
            } catch (error) {
                console.error("Failed to fetch sentiment data", error);
            }
        };
        getSentiment();
    }, []);
        
  
    return (
        <div className="bg-black rounded-lg h-full w-full md:w-96 mt-10 mx-5">
            <div className="font-bold mb-8 px-8 py-16">
                The markets are <span className="text-green-500">{sentimentData.overall_sentiment_label}</span>
            </div>
            <div className="mb-8 px-8 pb-5">
                <h1 className="text-sm my-2 mb-4">What you need to know today</h1>
                <span className=" font-semibold ">{sentimentData.title}</span>
            </div>

        </div>

    )
}

export default SentimentIndicator