import React, { useState } from 'react';
import '../assets/styles/CreateAccount.css'
import logo from '../assets/images/world-cup-2026-logo.jpg';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to group stage picks
    } catch (error) {
      console.error("Error signing up: ", error);
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
          <input type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
          <input type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <input type="password" placeholder="Password Confirmation" required />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;