import React from 'react';

function AboutUs({ onClose }) {
  return (
    <div className="about-us-overlay" onClick={onClose}>
      <div className="about-us-card" onClick={(e) => e.stopPropagation()}>
        <button className="about-us-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>About Paradise Nursery</h2>
        <p>
          Paradise Nursery has been growing happiness since 2010. What started
          as a single greenhouse has blossomed into a trusted destination for
          plant lovers who want to bring a little more green into their lives.
        </p>
        <p>
          We hand-select every plant in our catalog for its health, beauty,
          and ease of care, and we work directly with local growers to keep
          our plants affordable and sustainably sourced. Whether you're
          furnishing your first apartment or expanding an indoor jungle,
          our team is here to help you find the perfect fit for your space.
        </p>
        <p>
          Our mission is simple: make it easy for everyone to enjoy the
          benefits of a greener, healthier home.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
