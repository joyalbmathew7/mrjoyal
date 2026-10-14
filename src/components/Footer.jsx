import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div>
          <h3>Bharat Tyres</h3>
          <p>Your reliable neighborhood workshop for high-quality tyres and wheel care.</p>
        </div>
        <div>
          <h4>Visit Us</h4>
          <p>Enadimangalam, Elamanoor, Pathanamthitta District, Kerala</p>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <p>Phone: +91 98765 43210</p>
          <p>Hours: Mon - Sat: 8:30 AM - 7:30 PM</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bharat Tyres. All rights reserved.</p>
      </div>
    </footer>
  );
}