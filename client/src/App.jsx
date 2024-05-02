import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Price from './components/Price';
import Graph from './components/Graph';
import ProductCard2 from './components/ProductCard2';
import PopupGraph from './components/PopupGraph';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/price" element={<Price />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/product" element={<ProductCard2 />} />
        <Route path="/popup" element={<PopupGraph />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
