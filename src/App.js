import React, { useEffect, useState } from 'react'
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import User from './components/User';
import {  useSelector } from 'react-redux';
import Search from './components/Search';
import "./components/css/header.css"


function App() {
  const [isDarkMode,setisDarkMode] =useState(true)
  const DarkMode = useSelector(store=>store.theme.isDarkMode)
  
  useEffect(() => {
    setisDarkMode(DarkMode)
  
  }, [DarkMode]);
  return (
    
    <div className={`App flex flex-wrap ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-400 text-black'}`}>
      <Router>
      <div>
      <NavBar/>
      </div>
      <div className='ml-24'>
      <Header/>  
      <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/user" element={<User />} />
      <Route path="/search" element={<Search/>}/>
      </Routes>
      </div>
      </Router>
     </div>
   
  );
}

export default App;
