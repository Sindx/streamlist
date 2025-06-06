import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import About from './components/About';
import Cart from './components/Cart';
import PaymentForm from './components/PaymentForm';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import list from './data';

import './App.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : list.map(item => ({ ...item, quantity: 1 }));
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <PaymentForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
