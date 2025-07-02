import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import './Register.css'; // We'll create this CSS file
import GoogleSignIn from './GoogleSignIn';
import FirebaseLogin from './FirebaseLogin';
import Apis from '../Apis';

const Register = () => {
  const [username, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await axios.post(Apis.SIGN_UP, {
        username,
        email,
        password,
      });

      setMessage('Registration successful! Please check your email to verify your account.');
      setMessageType('success');
      setuserName('');
      setEmail('');
      setPassword('');
      
      // Optional: Auto-redirect after successful registration
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Registration failed. Email may already be in use.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Create Your ResumeGenius Account</h2>
          <p>Build professional resumes that get you hired</p>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <div className={`form-group ${username ? 'filled' : ''}`}>
            <FaUser className="input-icon" />
            <input
              type="text"
              value={username}
              onChange={(e) => setuserName(e.target.value)}
              required
            />
            <label>Full Name</label>
          </div>

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
            <div className="password-hint">
              Use 8+ characters with a mix of letters, numbers & symbols
            </div>
          </div>

          <div className="terms-agreement">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
            {!isLoading && <FaArrowRight className="button-icon" />}
          </button>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <div className="divider">
            <span>or sign up with</span>
          </div>

          <div className="social-register">
             
            <FirebaseLogin />
          </div>
        </form>

        <div className="register-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;