import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Auth/common.css'
import '../assets/styles/Auth/CreateAccount.css'
import logo from '../assets/images/world-cup-2026-logo.jpg';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;

      await updateProfile(currentUser, {
        displayName: `${firstName} ${lastName}`
      });
      navigate('/home');
    } catch (error) {
      console.error("Error creating account: ", error);
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src={logo} alt="FIFA World Cup 2026 Logo" />
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit}>
          
          <h2>Create Account</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
          <input type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Password Confirmation" required />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;