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
      <h2>Frequently Asked Questions</h2>
        <h3>Do I need to create an account?</h3>
        <p>Yes, you need to sign up with your email to start using Grow Wise.</p>
  
        <h3>How can I edit my income or expenses?</h3>
        <p>You can edit your income or expenses by navigating to the respective sections and making the necessary changes.</p>
    </div>
  );
};

export default ContactUs;

