// UserAuthComponent.js

import React, { useState } from 'react';

const User = () => {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

    const toggleForm = () => {
        setIsLogin(!isLogin); // Function to toggle between login and signup forms
    };

    return (
        <div className="min-h-screen  flex flex-col justify-center items-center">
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl w-96">
                <h2 className="text-3xl font-bold mb-4 text-white">{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form className="flex flex-col space-y-4">
                    {/* Form fields for login or sign up */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-white">Email</label>
                        <input type="email" id="email" className="bg-gray-700 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-white">Password</label>
                        <input type="password" id="password" className="bg-gray-700 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    {!isLogin && (
                        <div className="flex flex-col">
                            <label htmlFor="confirmPassword" className="text-white">Confirm Password</label>
                            <input type="password" id="confirmPassword" className="bg-gray-700 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-300" />
                        </div>
                    )}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
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
