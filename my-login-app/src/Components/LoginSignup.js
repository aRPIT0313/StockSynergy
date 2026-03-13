
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css'; // Ensure your CSS file is linked

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const { data } = await axios.post('http://localhost:5000/api/signup', { email, password });
        localStorage.setItem('token', data.token);
        alert("Signup successful! Redirecting to home...");
        navigate('/home');
      } else {
        const { data } = await axios.post('http://localhost:5000/api/login', { email, password });
        localStorage.setItem('token', data.token);
        alert("Login successful! Redirecting to home...");
        navigate('/home');
      }
    } catch (error) {
      setErrorMessage('Error: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setErrorMessage('');
  };

  return (
    <div className="login-signup-background"> {/* Wrapper for background image */}
      <div className="log-container">
        <h2>{isSignup ? 'Create an Account' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="button">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <p className="toggleText">
          {isSignup ? 'Already have an account?' : 'New user?'}
          <span onClick={toggleForm} className="toggleLink">
            {isSignup ? ' Login here' : ' Create an account'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;