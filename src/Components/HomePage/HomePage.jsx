//Homepage

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Our Expense Tracker</h1>
      <p>Here, you can keep track of your expenses easily.</p>
      <p>To start adding expenses, please sign up or log in.</p>
      <Link to="/signup">Sign Up</Link> | <Link to="/signin">Log In</Link>
    </div>
  );
};

export default HomePage;
