import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const SentimentIndicator = () => {
    const [sentimentData, setSentimentData] = useState({
        title: "Apple, Nvidia Are The Most Overbought Stocks On Wall Street Amid AI Frenzy: Here Are Other Stocks With Potential For Pullback - Apple  ( NASDAQ:AAPL ) , Broadcom  ( NASDAQ:AVGO ) ",
        overall_sentiment_label: "Somewhat-bullish"
    });
    const [allSentimentData, setAllSentimentData] = useState(null)
    const [currentSentimentIndex, setCurrentSentimentIndex] = useState(0);
    const DarkMode = useSelector(store => store.theme.isDarkMode)
    const [isDarkMode, setIsDarkMode] = useState(true);
    useEffect(() => {
        setIsDarkMode(DarkMode)

    }, [DarkMode]);
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
                setSentimentData(json.feed[1]);
                setAllSentimentData(json.feed.slice(0, 12));
            } catch (error) {
                console.error("Failed to fetch sentiment data", error);
            }
        };
        getSentiment();
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSentimentIndex(prevIndex => (prevIndex + 1) % 12);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (allSentimentData && allSentimentData.length > 0) {
            setSentimentData(allSentimentData[currentSentimentIndex]);
        }
    }, [currentSentimentIndex, allSentimentData]);

    return (
        <div className={`sentimentindicator rounded-lg h-80 w-[450px] mt-10 mx-5 hover:scale-110 transition-transform ${isDarkMode ? 'bg-black hover:bg-slate-900' : 'bg-gray-300'} 
        max-sm:w-72  max-sm:ml-[-30px] max-sm:mt-[-25px]`}>
            <div className="font-bold mb-8 px-8 py-16 max-sm:py-5">
                The markets are <span className="text-green-500">{sentimentData.overall_sentiment_label}</span>
            </div>
            <div className="mb-8 px-8 pb-5 max-sm:pb-2">
                <h1 className="text-sm my-2 mb-4">What you need to know today</h1>
                <span className=" font-semibold font-mono ">{sentimentData.title}</span>
            </div>

        </div>

    )
}

export default SentimentIndicator