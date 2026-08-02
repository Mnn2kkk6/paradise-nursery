import React, { useState } from 'react';
import './App.css';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

function App() {
  // view: 'landing' | 'products' | 'cart'
  const [view, setView] = useState('landing');
  const [showAboutUs, setShowAboutUs] = useState(false);

  if (view === 'products') {
    return <ProductList onNavigate={setView} />;
  }

  if (view === 'cart') {
    return <CartItem onNavigate={setView} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <nav className="landing-nav">
          <span className="landing-logo">🌿 Paradise Nursery</span>
          <button className="about-link" onClick={() => setShowAboutUs(true)}>
            About Us
          </button>
        </nav>

        <div className="landing-content">
          <h1 className="landing-title">Paradise Nursery</h1>
          <p className="landing-tagline">
            Where Green Meets Serenity — bring nature home, one plant at a time.
          </p>
          <button className="get-started-btn" onClick={() => setView('products')}>
            Get Started
          </button>
        </div>
      </div>

      {showAboutUs && <AboutUs onClose={() => setShowAboutUs(false)} />}
    </div>
  );
}

export default App;
