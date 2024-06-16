import React , { useState, useEffect }  from 'react'
import { IoIosHome } from "react-icons/io";
import { IoBookSharp, IoSearch , IoSettings } from "react-icons/io5";
import { MdOutlineBookmarks } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const borderColors = ['border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500'];
    const [currentBorderColor, setCurrentBorderColor] = useState(borderColors[0]);
    const [isDarkMode,setisDarkMode] =useState(true)
    const DarkMode = useSelector(store=>store.theme.isDarkMode)
    
    useEffect(() => {
      setisDarkMode(DarkMode)
    
    }, [DarkMode]);
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentBorderColor((prevBorderColor) => {
          const currentIndex = borderColors.indexOf(prevBorderColor);
          const nextIndex = (currentIndex + 1) % borderColors.length;
          return borderColors[nextIndex];
        });
      }, 2000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(timer);
      // eslint-disable-next-line
    }, []);
  
    return (
      <div className={`h-full   flex justify-center items-center shadow-2xl border-r ${isDarkMode ? 'bg-black' : 'bg-white '} ${currentBorderColor}`}>
        <div className=' mt-[-150px] flex flex-col items-center justify-center space-y-10'>
            <Link to="/"> <IoIosHome className=' h-11 w-11 m-3 cursor-pointer' /></Link>
          <IoSearch className=' h-11 w-11 m-3 cursor-pointer' />
          <MdOutlineBookmarks className=' h-11 w-11 m-3 cursor-pointer' />
          <IoBookSharp className=' h-11 w-11 m-3 cursor-pointer' />
          <Link to ="/user"><IoSettings className=' h-11 w-11 m-3 cursor-pointer' /></Link>
          
        </div>
      </div>
    );
  }
  
  export default NavBar;