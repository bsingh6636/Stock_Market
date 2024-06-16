import React from 'react'
import SentimentIndicator from './SentimentIndicator'
import SectorPerformance from './SectorPerformance'
import Markets from './Markets'
import RealTimeChart from './RealTimeChart'


const Body = () => {
  return (
    <div className=''>
      <div className='flex flex-row'>
        <SentimentIndicator />
        <SectorPerformance />
      </div>
      <div className='flex flex-row'>
        <Markets />
        <RealTimeChart />
      </div>
    </div>
  )
}

export default Body