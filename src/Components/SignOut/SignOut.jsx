// src/Components/SignOut/SignOut.jsx
import React, { useState }from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignOut.css";

const SignOut = ({ setIsAuthenticated }) => {
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsAuthenticated(false); // Update authentication state
    setShowNotification(true); // Show notification
    setTimeout(() => {
      setShowNotification(false);
    navigate('/signin'); // Redirect to sign in page
  }, 3000);

};

  return (
    <div className="signout">
            {showNotification && <div className="notification">You have successfully signed out</div>}
      {/* <h2>You are about to signed out</h2> */}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
