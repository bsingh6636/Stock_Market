import React from 'react'
import SentimentIndicator from './SentimentIndicator'
import SectorPerformance from './SectorPerformance'
import Markets from './Markets'
import RealTimeChart from './RealTimeChart'
import './css/body.css'

const Body = () => {
  return (
    <div className='body font-mono '>
      <div className='flex flex-row max-sm:flex-col'>
        <SentimentIndicator />
        <SectorPerformance />
      </div>
      <div className='flex flex-row max-sm:flex-col'>
        <Markets />
        <RealTimeChart />
      </div>
    </div>
  )
}

export default Body