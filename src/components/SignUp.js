import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const [username, setUsername] = useState('');
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
    <form onSubmit={handleSubmit}>
      <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
      <input type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;