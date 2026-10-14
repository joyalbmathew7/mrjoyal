import React from 'react';

export default function Hero() {
  return (
    <header id="home" className="hero-section">
      <div className="hero-content">
        <span className="badge">Trusted Local Tyre Experts</span>
        <h1>Keep Your Wheels Rolling Safely on Every Road.</h1>
        <p>
          Professional tyre sales, precision wheel balancing, reliable puncture repairs, and complete vehicle upkeep designed for maximum road grip and performance.
        </p>
        <div className="hero-buttons">
          <a href="tel:+919876543210" className="btn-primary">Call +91 98765 43210</a>
        </div>
      </div>
    </header>
  );
}