import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import Navbar from './Navbar';
import './PlantDetail.css';

function PlantDetail({ plant, department, onNavigate, onBack }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!plant) {
    return (
      <div className="detail-page">
        <Navbar activeView="products" activeDepartment={department} onNavigate={onNavigate} />
        <p className="detail-not-found">Item not found.</p>
        <button className="back-link" onClick={onBack}>
          ← Back
        </button>
      </div>
    );
  }

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      dispatch(addItem(plant));
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleOrderNow = () => {
    for (let i = 0; i < quantity; i += 1) {
      dispatch(addItem(plant));
    }
    onNavigate('cart');
  };

  return (
    <div className="detail-page">
      <Navbar activeView="products" activeDepartment={department} onNavigate={onNavigate} />

      <div className="detail-container">
        <button className="back-link" onClick={onBack}>
          ← Back
        </button>

        <div className="detail-content">
          <img src={plant.image} alt={plant.name} className="detail-image" />

          <div className="detail-info">
            <h1 className="detail-name">{plant.name}</h1>
            <p className="detail-price">${plant.price.toFixed(2)}</p>

            {plant.description && (
              <p className="detail-description">{plant.description}</p>
            )}

            {plant.info && (
              <p className="detail-care">
                <span className="detail-care-label">Details:</span> {plant.info}
              </p>
            )}

            <div className="detail-quantity">
              <span className="detail-quantity-label">Quantity</span>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="detail-actions">
              <button
                className={`add-to-cart-btn detail-add-btn ${justAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {justAdded ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button className="order-now-btn" onClick={handleOrderNow}>
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantDetail;
