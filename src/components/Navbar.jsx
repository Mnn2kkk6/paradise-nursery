import React from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';

const DEPARTMENTS = [
  { key: 'plants', label: 'Plants' },
  { key: 'flowers', label: 'Flowers' },
  { key: 'pots', label: 'Pots' },
  { key: 'supplies', label: 'Soil & Supplies' },
  { key: 'decor', label: 'Decor' },
];

function Navbar({ activeView, activeDepartment, onNavigate }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="pn-navbar">
      <span className="pn-logo" onClick={() => onNavigate('landing')}>
        🌿 Paradise Nursery
      </span>
      <div className="pn-nav-links">
        <button
          className={`pn-nav-link ${activeView === 'landing' ? 'active' : ''}`}
          onClick={() => onNavigate('landing')}
        >
          Home
        </button>
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept.key}
            className={`pn-nav-link ${
              activeView === 'products' && activeDepartment === dept.key ? 'active' : ''
            }`}
            onClick={() => onNavigate('products', dept.key)}
          >
            {dept.label}
          </button>
        ))}
        <button
          className={`pn-nav-link ${activeView === 'cart' ? 'active' : ''}`}
          onClick={() => onNavigate('cart')}
        >
          <span className="cart-icon">🛒</span> Cart
          <span className="cart-count">{totalItems}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
