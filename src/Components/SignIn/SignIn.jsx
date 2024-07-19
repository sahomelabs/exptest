import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // Replace with actual authentication logic
    if (email === 'user@example.com' && password === 'password') {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="signin">
      <form onSubmit={handleSignIn}>
        <h2>Sign In</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
