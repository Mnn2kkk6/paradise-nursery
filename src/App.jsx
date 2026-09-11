import React, { useState } from 'react';
import './App.css';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import PlantDetail from './components/PlantDetail';
import FloraChat from './components/FloraChat';

function App() {
  // view: 'landing' | 'products' | 'cart' | 'detail'
  const [view, setView] = useState('landing');
  const [department, setDepartment] = useState('plants');
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Central navigation handler. `dept` is only passed when switching
  // to a department tab (Plants / Flowers / Pots / Soil & Supplies / Decor).
  const handleNavigate = (nextView, dept) => {
    if (dept) setDepartment(dept);
    setView(nextView);
  };

  // `dept` here is optional — Flora passes it so a flower/pot recommendation
  // opens under the right department instead of leaving it unchanged.
  const handleSelectPlant = (plant, dept) => {
    if (dept) setDepartment(dept);
    setSelectedPlant(plant);
    setView('detail');
  };

  let content;

  if (view === 'products') {
    content = (
      <div className="view-fade-enter" key="products">
        <ProductList
          onNavigate={handleNavigate}
          onSelectPlant={handleSelectPlant}
          department={department}
        />
      </div>
    );
  } else if (view === 'detail') {
    content = (
      <div className="view-fade-enter" key="detail">
        <PlantDetail
          plant={selectedPlant}
          department={department}
          onNavigate={handleNavigate}
          onBack={() => setView('products')}
        />
      </div>
    );
  } else if (view === 'cart') {
    content = (
      <div className="view-fade-enter" key="cart">
        <CartItem onNavigate={handleNavigate} />
      </div>
    );
  } else {
    content = (
      <div className="landing-page view-fade-enter" key="landing">
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
            <button
              className="get-started-btn"
              onClick={() => handleNavigate('products', 'plants')}
            >
              Get Started
            </button>
          </div>
        </div>

        {showAboutUs && <AboutUs onClose={() => setShowAboutUs(false)} />}
      </div>
    );
  }

  return (
    <>
      {content}
      <FloraChat onNavigate={handleNavigate} onSelectPlant={handleSelectPlant} />
    </>
  );
}

export default App;
