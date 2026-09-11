import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementQuantity, decrementQuantity } from '../redux/CartSlice';
import Navbar from './Navbar';
import './CartItem.css';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  const calculateItemTotal = (item) => item.price * item.quantity;

  const calculateTotalAmount = () =>
    cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const handleIncrement = (name) => dispatch(incrementQuantity(name));
  const handleDecrement = (name) => dispatch(decrementQuantity(name));
  const handleRemove = (name) => dispatch(removeItem(name));

  const handleCheckout = () => setShowCheckoutMessage(true);

  return (
    <div className="cart-page">
      <Navbar activeView="cart" onNavigate={onNavigate} />

      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        <p className="cart-total-amount">
          Total: ${calculateTotalAmount().toFixed(2)}
        </p>

        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.name}>
                <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-unit-price">Unit price: ${item.price.toFixed(2)}</p>
                  <p className="cart-item-total-price">
                    Subtotal: ${calculateItemTotal(item).toFixed(2)}
                  </p>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleDecrement(item.name)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleIncrement(item.name)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleRemove(item.name)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-actions">
          <button className="continue-shopping-btn" onClick={() => onNavigate('products')}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>

        {showCheckoutMessage && (
          <p className="checkout-message">Coming Soon!</p>
        )}
      </div>
    </div>
  );
}

export default CartItem;
