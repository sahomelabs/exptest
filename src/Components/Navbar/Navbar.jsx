import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = ({isAuthenticated}) => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <li><Link to="/signout">Sign Out</Link></li>
        ) : (
          <li><Link to="/signin">Sign In</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
