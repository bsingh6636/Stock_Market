import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import { IoIosHome } from "react-icons/io";
import { IoBookSharp, IoSearch, IoSettings } from "react-icons/io5";
import { MdOutlineBookmarks } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../functions/firebase';
import { addUser } from './utils/userSlice';

const NavBar = () => {
  const dispatch =useDispatch()
  
  const borderColors = ['border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500'];
  const [currentBorderColor, setCurrentBorderColor] = useState(borderColors[0]);
  const [isDarkMode, setisDarkMode] = useState(true)
  const DarkMode = useSelector(store => store.theme.isDarkMode)
 

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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // navigate("/browse");
      } else {
        // User is signed out
        // ...
        // dispatch(removeUser());
        // navigate("/");
      }
    });
  }, []);

  return (
    <div className={`fixed top-0 left-0 h-full w-16 flex flex-col justify-center items-center shadow-2xl border-r ${isDarkMode ? 'bg-black' : 'bg-gray-500'} ${currentBorderColor}`}>
      <div className='flex flex-col items-center justify-center space-y-10'>
        <Link to="/"> <IoIosHome className='h-11 w-11 m-3 cursor-pointer hover:scale-150 transition-transform' /></Link>
        <Link to="/search"> <IoSearch className='h-11 w-11 m-3 cursor-pointer hover:scale-150 transition-transform' /></Link>
        <MdOutlineBookmarks className='h-11 w-11 m-3 hover:scale-150 transition-transform' />
        <IoBookSharp className='h-11 w-11 m-3 hover:scale-150 transition-transform' />
        <Link to="/user"><IoSettings className='h-11 w-11 m-3 cursor-pointer hover:scale-150 transition-transform' /></Link>
      </div>
    </div>
  
  );
}

export default NavBar;