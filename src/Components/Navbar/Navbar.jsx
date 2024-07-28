//Navbar 
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, userEmail  }) => {

  return (
    <nav className="navbar">
      <ul>
        {isAuthenticated ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-expense">Add Expense</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>
            <li>Welcome, {userEmail ? userEmail.split('@')[0] : 'User'}!</li>
            <li><Link to="/signout">Sign Out</Link></li>

          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
