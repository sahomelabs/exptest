//Contact Page 
import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <p>If you have any questions or need support, please feel free to email us directly at:</p>
      <p className="email-link">
        <a href="mailto:support@growwise.com">support@grow--wise.com</a>
      </p>
    </div>
  );
};

export default ContactUs;

