import React, { useEffect, useState } from 'react'
import { FaCompass, FaSun, FaMoon } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FcApproval } from "react-icons/fc";
import { PiTelevisionThin } from "react-icons/pi";
import { MdBookmarkAdd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from './utils/theme';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../functions/firebase';
import { removeUser } from './utils/userSlice';
import "./css/header.css"
const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const DarkMode = useSelector(store => store.theme.isDarkMode)
  const [userName, setUserNmae] = useState("User")
  const [size, setSize] = useState(getScreenWidth());
  const handlesignout = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        // An error happened.
      });
    dispatch(removeUser());
  };
  useEffect(() => {
    if (user) {
      setUserNmae(user.displayName)
    }
  }, [user])
  useEffect(() => {
    setIsDarkMode(DarkMode)

  }, [DarkMode]);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(changeTheme())
  };
  function getScreenWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
useEffect(() => {
  const handleResize = () => {
    setSize(getScreenWidth());
  };

  window.addEventListener('resize', handleResize);

  // Cleanup event listener on component unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
   console.log(size)
  const date = new Date()                                     
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const dayName = date.toLocaleString('default', { weekday: 'long' });
  return (
    <div className={` max-w-max flex justify-between p-5 rounded-2xl  ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-gray-500 '}
     max-sm:p-0 max-sm:mb-10 max-sm:ml-[-35px]   `}>
      <div className='mt-6 max-sm:mt-7'>
        <h1 className='text-2xl font-serif p-4 flex items-center max-sm:p-2 '>Hello, {userName} <FcApproval className='ml-2 ' /></h1>
        <h4 className='text-slate-400 p-4 '>{dayName}, {month} {day}</h4>
      </div>
      <div className='headerdiv12 flex flex-row justify-end flex-grow ml-[450px] max-sm:ml-[0px] max-lg:ml-[100px] '> 
        <div className='flex flex-row mt-10 items-center bg-slate-700 rounded-3xl h-11 cursor-pointer hover:scale-150 transition-transform' onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun className='m-4 ' /> : <FaMoon className='m-4 ' />}
        </div>
        <div className='flex flex-row mt-10 items-center mx-3 bg-slate-700 rounded-3xl h-11 hover:scale-125  transition-transform max-sm:hidden'>
          <FaCompass className='m-4  transition-transform' />
          <h1 className='mr-4 transition-transform'>For You</h1>
        </div>
        <div className='flex flex-row mt-10 items-center mx-3 bg-slate-700 rounded-3xl h-11 hover:scale-125 transition-transform max-sm:hidden'>
          <PiTelevisionThin className='m-4 ' />
          <h1 className='mr-4 '>Screener</h1>
        </div>
        <div className='flex flex-row mt-10 items-center mx-3 bg-slate-700 rounded-3xl h-11 hover:scale-125 transition-transform'>
          <Link to="/search"> <IoSearch className='m-4 max-sm:hidden' /></Link>
        </div>
        <div className='flex flex-row mt-10 items-center mx-3 ml-5 bg-slate-700 rounded-3xl h-11 hover:scale-125 transition-transform max-sm:hidden'>
          <MdBookmarkAdd className='m-4 ' />
        </div>
        <div className='flex flex-row mt-10 items-center mx-3 ml-10  rounded-lg h-14 hover:scale-125 transition-transform max-sm:mx-1'>
          {user ? (
            <button className='py-3 px-4 bg-red-600 text-white rounded-lg ' onClick={handlesignout}>
              Logout
            </button>
          ) : (
            !user && (
              <Link to="/user">
                <button className='py-3 px-4 bg-green-500 text-white rounded-lg '>
                  Login
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Header