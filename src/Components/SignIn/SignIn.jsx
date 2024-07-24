import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './SignIn.css';

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend for login
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });

      // Assuming your backend sends a token in the response
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        setIsAuthenticated(true);
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
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
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default SignIn;
