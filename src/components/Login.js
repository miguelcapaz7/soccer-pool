import React, { useState } from 'react';
import '../assets/styles/Login.css'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from '../assets/images/world-cup-2026-logo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      console.error("Error logging in: ", error);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src={logo} alt="FIFA World Cup 2026 Logo" />
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Login</button>
          <div className="or-divider"><span>OR</span></div>
          <a className="createAccount" href="/createAccount">Create Account</a>
        </form>
      </div>
    </div>
  );
};

export default Login;