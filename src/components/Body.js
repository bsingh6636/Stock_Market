import React, { useEffect, useState } from 'react'
import SentimentIndicator from './SentimentIndicator'
import SectorPerformance from './SectorPerformance'
import Markets from './Markets'
import RealTimeChart from './RealTimeChart'
import { useSelector } from 'react-redux'

const Body = () => {
  // const [isDarkMode,setisDarkMode] =useState(true)
  // const DarkMode = useSelector(store=>store.theme.isDarkMode)
  
  // useEffect(() => {
  //   setisDarkMode(DarkMode)
  
  // }, [DarkMode]);
  // console.log(isDarkMode)
  return (
    <div className=''>
      <div className='flex flex-row'>
      <SentimentIndicator />
      <SectorPerformance/>
      </div>
      <div className='flex flex-row'>
      <Markets/>
      <RealTimeChart />
      </div>
     
      
      
    </div>
  )
}

export default Body