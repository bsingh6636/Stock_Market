// UserAuthComponent.js

import React, { useEffect, useRef, useState } from 'react';
import { formvalidate } from '../functions/formvalidate';
import { auth } from '../functions/firebase';
import { useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import SignedInUser from './SignedInUser';
import "./css/user.css"

const User = () => {

    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
    const email = useRef(""); const password = useRef(""); const displayName = useRef("");
    const [showPassword, setShowPassword] = useState(false);
    const [formvalidateresult, setformvalidateresult] = useState(null)
    const user = useSelector(store => store.user)
    const [userDetails, setUserDetails] = useState(null)
    useEffect(() => {
        setUserDetails(user)
    }, [user])
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
            // ("Sing in form")
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
                    // const user = userCredential.user;
                    // console.log(user)
                    updateProfile(auth.currentUser, {
                        displayName: displayName.current.value, photoURL: "https://avatars.githubusercontent.com/u/78442057?v=4"
                    }).then(() => {

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


    return userDetails ? <SignedInUser user={userDetails} /> : (
        <div  className="min-h-screen  flex flex-col justify-center items-center mt-[-150px] max-sm:ml-[-30px] ">
            <div className="div2 bg-gray-800 rounded-lg p-8 shadow-xl w-96 max-sm:w-64 max-sm:p-5">
                <h2 className="text-3xl font-bold mb-4 text-white">{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form className="flex flex-col space-y-4">
                    {/* Form fields for login or sign up */}
                    {!isLogin && (
                        <div className="flex flex-col">

                            <input type="Name" ref={displayName} placeholder='Enter Name' id="Name" className="p-3 m-2 w-full border border-white
                             placeholder-zinc-50   font-semibold  bg-black bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <input placeholder='Enter Email' ref={email} type="email" id="email" className="p-3 m-2 w-full border border-white placeholder-zinc-50
                         font-semibold bg-black bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            ref={password}
                            className='p-3 m-2 w-full border border-white placeholder-zinc-50 font-semibold bg-black bg-opacity-80 focus:outline-none focus:ring-2
                             focus:ring-offset-2 focus:ring-blue-500'
                        />
                        <button
                            type="button"
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 h-9 w-9'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <img src="https://res.cloudinary.com/djo21zbg6/image/upload/v1715459571/hidepassword_gfaoyi.svg" alt='Hide Password' />
                            ) : (
                                <img src="https://img.icons8.com/glassmorphism/48/visible.png" alt='Show Password' />
                            )}
                        </button>
                    </div>
                    {formvalidate && <p className='pl-3 py-1 text-red-600  font-bold'>{formvalidateresult}</p>}


                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        onClick={(e) => {
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
