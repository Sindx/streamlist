import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartItems }) => {
  const cartCount = cartItems
    .filter(item => item.quantity > 0)
    .reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">StreamList</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/cart">
          Cart <span className="cart-count">({cartCount})</span>
        </Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
