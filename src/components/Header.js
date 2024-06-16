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
const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const DarkMode = useSelector(store => store.theme.isDarkMode)
  const [userName, setUserNmae] = useState("User")
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
  const date = new Date()
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const dayName = date.toLocaleString('default', { weekday: 'long' });
  return (
    <div className={` max-w-max flex justify-between ${isDarkMode ? 'bg-slate-950' : 'bg-white '}`} >
      <div className='mt-6'>
        <h1 className=' text-2xl font-serif p-4 flex items-center'>Hello,{userName} <FcApproval className='ml-2' /></h1>
        <h4 className='text-slate-400 p-4'>{dayName}, {month} {day}</h4>
      </div>
      <div className='flex flex-row justify-end flex-grow ml-[450px]'>
        <div className='flex flwex-row mt-10 items-center  bg-slate-700 text-slate-500 rounded-3xl h-11 cursor-pointer' onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun className='m-4' /> : <FaMoon className='m-4' />}
        </div>
        <div className='flex flex-row mt-10 items-center mx-3 bg-slate-700 text-slate-500 rounded-3xl h-11'>
          <FaCompass className='m-4' />
          <h1 className='mr-4'>For You</h1>
        </div>

        <div className='flex flex-row mt-10 items-center mx-3 bg-slate-700 text-slate-500 rounded-3xl h-11'>
          <PiTelevisionThin className='m-4' />
          <h1 className='mr-4'>Screener</h1>
        </div>

        <div className='flex flex-row mt-10 items-center mx-3 bg-slate-700 text-slate-500 rounded-3xl h-11'>
          <Link to="/search">  <IoSearch className='m-4' /></Link>
        </div>

        <div className='flex flex-row mt-10 items-center mx-3 ml-5 bg-slate-700 text-slate-500 rounded-3xl h-11'>
          <MdBookmarkAdd className='m-4' />
          
        </div>
        <div className='flex flex-row mt-10 items-center mx-3 ml-10 bg-slate-700 text-slate-500 rounded-xl h-11'>
          {user ? (
            <button className='p-3 bg-red-500 text-black rounded-xl' onClick={handlesignout}>
              Logout
            </button>
          ) : (
            !user && (
              <Link to="/user">
                <button className='p-3 bg-green-500 text-black rounded-xl'>
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