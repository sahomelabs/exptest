import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignOut.css';

const SignOut = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate('/signin');
  };

  return (
    <div className="signout">
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
