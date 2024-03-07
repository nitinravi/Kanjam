import React from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Adjusted import path
import Signup from './components/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
