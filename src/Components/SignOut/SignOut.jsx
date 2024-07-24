// src/Components/SignOut/SignOut.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsAuthenticated(false); // Update authentication state
    navigate('/signin'); // Redirect to sign in page
  };

  return (
    <div className="signout">
      <h2>You are signed out</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
