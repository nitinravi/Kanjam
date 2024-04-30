import React from 'react';
import { Navigate } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
  // If user is not logged in, redirect to login page
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace={true} />;
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Home Page!</h2>
        <p className="text-gray-600">You are now logged in.</p>
      </div>
    </div>
  );
};

export default Home;
