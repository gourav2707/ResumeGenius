import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaGithub } from 'react-icons/fa';
import './Login.css'; // We'll create this CSS file
import Apis from '../Apis';

const Login = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await axios.post( Apis.SIGN_IN, {
        email,
        password,
      });

      const { token, user } = res.data;
      
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setMessage('Login successful! ');
      setMessageType('success');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      setMessage('Login failed. Either email not verified or credentials are wrong.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome to ResumeGenius</h2>
          <p>Sign in to access your resume builder dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className={`form-group ${email ? 'filled' : ''}`}>
            <FaEnvelope className="input-icon" />
            <input 
            
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email Address</label>
          </div>

          <div className={`form-group ${password ? 'filled' : ''}`}>
             <FaLock className="input-icon" />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            {/* <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link> */}
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          

           
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/register">Create New</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;