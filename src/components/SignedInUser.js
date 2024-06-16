import React from 'react';

const SignedInUser = ({ user }) => {
  console.log(user);
  const { uid, email, displayName, photoURL } = user;
  console.log(uid, email, displayName, photoURL);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-[-50px]">
      <h1 className="text-2xl font-bold mb-4">You're currently signed in!</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xs text-center">
        <img
          src={photoURL}
          alt={`${displayName}'s profile`}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="text-lg text-gray-600 font-semibold">{displayName}</p>
        <p className="text-gray-600">{email}</p>
        <p className="text-gray-600">User ID: {uid}</p>
      </div>
    </div>
  );
};

export default SignedInUser;
