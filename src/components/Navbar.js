import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const { user, authStatus } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  if (authStatus) {
    return null
  }

  return (
    <nav>
    <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/rules">Rules</a></li>
        <li><a href="/leaderboard">Leaderboard</a></li>
        <div className="nav-right">
        <div>
            <span onClick={toggleDropdown} style={{ cursor: 'pointer' }}>{user ? `${user.displayName}` : 'Logged out'}</span>
            {dropdownOpen && (
            <div className="dropdown">
                <button onClick={handleLogout} className="btn logout-btn">Logout</button>
            </div>
            )}
        </div>
        </div>
    </ul>
    </nav>
  );
};

export default Navbar;
