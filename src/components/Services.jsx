import React from 'react';

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="section-title">
        <span>Our Professional Services</span>
        <h2>Complete Care for Your Vehicle's Wheels</h2>
      </div>

      <div className="services-grid">
        <div className="service-card">
          <h3>Tyre Replacement & Sales</h3>
          <p>Wide range of branded tyres for cars, SUVs, and commercial vehicles with expert fitting.</p>
        </div>
        <div className="service-card">
          <h3>Wheel Balancing & Alignment</h3>
          <p>State-of-the-art balancing for smooth steering, reduced vibration, and even tyre wear.</p>
        </div>
        <div className="service-card">
          <h3>Puncture Repairs & Maintenance</h3>
          <p>Quick and reliable tube and tubeless puncture repairs using modern plug and patch techniques.</p>
        </div>
      </div>
    </section>
  );
}