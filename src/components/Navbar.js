import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const { user, authStatus } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  if (!authStatus) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li>
          <a onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
            Home
          </a>
        </li>
        <li>
          <a onClick={() => navigate("/rules")} style={{ cursor: "pointer" }}>
            Rules
          </a>
        </li>
        <li>
          <a
            onClick={() => navigate("/leaderboard")}
            style={{ cursor: "pointer" }}
          >
            Leaderboard
          </a>
        </li>
        <div className="nav-right">
          <div>
            <span onClick={toggleDropdown} style={{ cursor: "pointer" }}>
              {user.displayName}
            </span>
            {dropdownOpen && (
              <div className="dropdown">
                <button onClick={handleLogout} className="btn logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
