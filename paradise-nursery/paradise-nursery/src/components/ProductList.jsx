import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import plantsData from '../data/plantsData';
import './ProductList.css';

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedItems, setAddedItems] = useState({});

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div className="product-page">
      <nav className="pn-navbar">
        <span className="pn-logo" onClick={() => onNavigate('landing')}>
          🌿 Paradise Nursery
        </span>
        <div className="pn-nav-links">
          <button className="pn-nav-link" onClick={() => onNavigate('landing')}>
            Home
          </button>
          <button className="pn-nav-link active" onClick={() => onNavigate('products')}>
            Plants
          </button>
          <button className="pn-nav-link" onClick={() => onNavigate('cart')}>
            <span className="cart-icon">🛒</span> Cart
            <span className="cart-count">{totalItems}</span>
          </button>
        </div>
      </nav>

      <div className="product-list-container">
        <h1 className="product-list-title">Our Plants</h1>

        {plantsData.map((categoryGroup) => (
          <div key={categoryGroup.category} className="category-section">
            <h2 className="category-title">{categoryGroup.category}</h2>
            <div className="plant-grid">
              {categoryGroup.plants.map((plant) => {
                const isAdded = !!addedItems[plant.name];
                return (
                  <div className="plant-card" key={plant.name}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="plant-thumbnail"
                    />
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-price">${plant.price.toFixed(2)}</p>
                    <button
                      className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                      disabled={isAdded}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isAdded ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
