// UserAuthComponent.js

import React, { useEffect, useRef, useState } from 'react';
import { formvalidate } from '../functions/formvalidate';
import { auth } from '../functions/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import SignedInUser from './SignedInUser';

const User = () => {
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
    const email = useRef(""); const password = useRef(""); const displayName = useRef("");
    const [showPassword, setShowPassword] = useState(false);
    const [formvalidateresult, setformvalidateresult] = useState(null)
    const user = useSelector(store=>store.user)
    const [userDetails,setUserDetails]=useState(null)
    useEffect(()=>{
        setUserDetails(user)
    },[user])
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin); // Function to toggle between login and signup forms
    };
    const formvalidation = () => {

        const formvalidatione = formvalidate(email.current.value, password.current.value);
        setformvalidateresult(formvalidatione);
        if (formvalidatione) return;
        if (isLogin) {
            // console.log("Sing in form")
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    // const user = userCredential.user;
                    // console.log(user);
                    // navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setformvalidateresult(errorCode + "--" + errorMessage)
                    console.log(errorCode + "--" + errorMessage)
                });

        }
        else {
            // console.log("Sing up form")
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value, displayName.current.value)
                .then((userCredential) => {
                    // Signed up  
                    const user = userCredential.user;
                    // console.log(user)
                    updateProfile(auth.currentUser, {
                        displayName: displayName.current.value, photoURL: "https://avatars.githubusercontent.com/u/78442057?v=4"
                    }).then(() => {
                        console.log(user)
                        const { uid, email, displayName, photoURL } = user;
                        // dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                        // ...
                    }).catch((error) => {
                        setformvalidateresult(error)
                        console.log(error)
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setformvalidateresult(errorCode + "--" + errorMessage)
                    console.log(errorCode + "--" + errorMessage)
                });
        }
    }
    
    return userDetails ? <SignedInUser user={userDetails}/> : (
        <div className="min-h-screen  flex flex-col justify-center items-center mt-[-50px]">
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl w-96">
                <h2 className="text-3xl font-bold mb-4 text-white">{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form className="flex flex-col space-y-4">
                    {/* Form fields for login or sign up */}
                    {!isLogin && (
                        <div className="flex flex-col">
                            <label htmlFor="Name" className="text-white">Enter Name</label>
                            <input type="Name" ref={displayName} id="Name" className="bg-gray-700 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-white">Email</label>
                        <input ref={email} type="email" id="email" className="bg-gray-700 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-white">Password</label>
                        <input ref={password} type="password" id="password" className="bg-gray-700 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300" onClick={(e) => {
                        e.preventDefault();
                        formvalidation();
                    }}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-white mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={toggleForm} className="text-blue-400 ml-1 hover:text-blue-300 focus:outline-none">
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default User;
