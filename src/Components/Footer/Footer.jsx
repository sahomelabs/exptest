// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <a href="/terms-of-use">Terms of Use</a>
        <a href="/contact-us">Contact Us</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
        <p>&copy; 2024 Expense Tracker</p>
    </footer>
  );
};

export default Footer;
