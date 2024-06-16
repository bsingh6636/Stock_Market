import React from 'react'
import SentimentIndicator from './SentimentIndicator'
import SectorPerformance from './SectorPerformance'
import Markets from './Markets'
import RealTimeChart from './RealTimeChart'

const Body = () => {
  return (
    <div className='text-white'>
      <div className='flex flex-row'>
      <SentimentIndicator />
      <SectorPerformance/>
      </div>
      <div className='flex flex-row'>
      <Markets/>
      <RealTimeChart symbol={"AAPL"}/>
      </div>
     
      
      
    </div>
  )
}

export default Body