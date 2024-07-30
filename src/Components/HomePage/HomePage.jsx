//Homepage
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-page">
        <h1>Welcome to GrowWise</h1>
      <p>Here, you can keep track of your expenses easily.
        <br></br>
      To start adding expenses, please sign up or log in.</p>
      <div className='button-container'>
          <Link to="/signup">Sign Up</Link> 
          <Link to="/signin">Log In</Link>
      </div>
      

    </div>
  );
};

export default HomePage;
