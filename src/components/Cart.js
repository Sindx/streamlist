import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { Link } from 'react-router-dom';


const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id, delta) => {
    const updatedItems = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
        : item
    );
    setCartItems(updatedItems);
  };

  const handleRemove = (id) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: 0 } : item
    );
    setCartItems(updatedItems);
  };

  const handleRestore = (id) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: 1 } : item
    );
    setCartItems(updatedItems);
  };

  const total = cartItems
    .filter(item => item.quantity > 0)
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/checkout');
    } else {
      alert('You must be logged in to checkout.');
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.filter(item => item.quantity > 0).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems
          .filter(item => item.quantity > 0)
          .map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.service} />
              <div className="cart-details">
                <h4>{item.service}</h4>
                <p>{item.serviceInfo}</p>
                <p>${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
      )}

      {cartItems.filter(item => item.quantity > 0).length > 0 && (
        <div className="cart-total">
          <h3>Total: ${total}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      )}

      {cartItems.some(item => item.quantity === 0) && (
        <div className="restore-section">
          <h3>Recently Removed</h3>
          {cartItems
            .filter(item => item.quantity === 0)
            .map(item => (
              <div key={item.id} className="cart-item removed">
                <h4>{item.service}</h4>
                <button onClick={() => handleRestore(item.id)}>Restore</button>
              </div>
            ))}
        </div>
      )}

      <div className="login-simulation">
        <button
          onClick={() => {
            localStorage.setItem('userLoggedIn', 'true');
            alert('Simulated login complete');
          }}
        >
          Simulate Login
        </button>
      </div>
    </div>
  );
};
<Link to="/checkout">
  <button className="checkout-button">Proceed to Checkout</button>
</Link>

export default Cart;
