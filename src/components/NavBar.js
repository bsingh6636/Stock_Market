import React , { useState, useEffect }  from 'react'
import { IoIosHome } from "react-icons/io";
import { IoBookSharp, IoSearch , IoSettings } from "react-icons/io5";
import { MdOutlineBookmarks } from "react-icons/md";
import { Link } from 'react-router-dom';

const NavBar = () => {
    const borderColors = ['border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500'];
    const [currentBorderColor, setCurrentBorderColor] = useState(borderColors[0]);
  
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
      <div className={`h-full   bg-black flex justify-center items-center shadow-2xl border-r ${currentBorderColor}`}>
        <div className=' mt-[-150px] flex flex-col items-center justify-center space-y-10'>
            <Link to="/"> <IoIosHome className='text-white h-11 w-11 m-3 cursor-pointer' /></Link>
          <IoSearch className='text-white h-11 w-11 m-3 cursor-pointer' />
          <MdOutlineBookmarks className='text-white h-11 w-11 m-3 cursor-pointer' />
          <IoBookSharp className='text-white h-11 w-11 m-3 cursor-pointer' />
          <Link to ="/user"><IoSettings className='text-white h-11 w-11 m-3 cursor-pointer' /></Link>
          
        </div>
      </div>
    );
  }
  
  export default NavBar;