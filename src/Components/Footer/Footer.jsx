// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <a href="/contactus">Contact Us</a>
        <a href="/terms-of-use">Terms of Use</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
        <p>&copy; 2024 GrowWise</p>
    </footer>
  );
};

export default Footer;
