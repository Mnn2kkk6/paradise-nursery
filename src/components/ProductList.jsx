import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import storeData from '../data/plantsData';
import Navbar from './Navbar';
import './ProductList.css';

const DEPARTMENT_COPY = {
  plants: {
    title: 'Our Plants',
    subtitle:
      'Hand-picked greenery for every room, from air-purifying leaves to low-maintenance succulents. Tap a plant to see details.',
  },
  flowers: {
    title: 'Fresh Flowers',
    subtitle:
      'Fresh-cut bouquets, hand-tied and ready to brighten a room or make a great gift. Tap a bouquet to see details.',
  },
  pots: {
    title: 'Pots & Planters',
    subtitle:
      'Find the perfect home for your plants, from classic terracotta to modern self-watering pots.',
  },
  supplies: {
    title: 'Soil & Plant Care',
    subtitle:
      'Everything you need to keep your plants thriving — soil mixes, fertilizer, and care tools.',
  },
  decor: {
    title: 'Plant Decor & Accessories',
    subtitle:
      'Stands, hangers, and finishing touches to style your plants beautifully.',
  },
};

function ProductList({ onNavigate, onSelectPlant, department = 'plants' }) {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState({});

  const categories = storeData[department] || [];
  const copy = DEPARTMENT_COPY[department] || DEPARTMENT_COPY.plants;

  const handleAddToCart = (event, item) => {
    event.stopPropagation();
    dispatch(addItem(item));
    setAddedItems((prev) => ({ ...prev, [item.name]: true }));
  };

  const handleOrderNow = (event, item) => {
    event.stopPropagation();
    dispatch(addItem(item));
    onNavigate('cart');
  };

  return (
    <div className="product-page">
      <Navbar activeView="products" activeDepartment={department} onNavigate={onNavigate} />

      <div className="product-list-container">
        <h1 className="product-list-title">{copy.title}</h1>
        <p className="product-list-subtitle">{copy.subtitle}</p>

        {categories.map((categoryGroup) => (
          <div key={categoryGroup.category} className="category-section">
            <h2 className="category-title">{categoryGroup.category}</h2>
            <div className="plant-grid">
              {categoryGroup.items.map((item) => {
                const isAdded = !!addedItems[item.name];
                return (
                  <div
                    className="plant-card"
                    key={item.name}
                    onClick={() => onSelectPlant(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') onSelectPlant(item);
                    }}
                  >
                    <img src={item.image} alt={item.name} className="plant-thumbnail" />
                    <h3 className="plant-name">{item.name}</h3>
                    <p className="plant-price">${item.price.toFixed(2)}</p>
                    <div className="plant-card-actions">
                      <button
                        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
                        disabled={isAdded}
                        onClick={(e) => handleAddToCart(e, item)}
                      >
                        {isAdded ? 'Added' : 'Add to Cart'}
                      </button>
                      <button
                        className="order-now-btn-small"
                        onClick={(e) => handleOrderNow(e, item)}
                      >
                        Order Now
                      </button>
                    </div>
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
