import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, authStatus } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!authStatus) {
    return null;
  }

  return (
    <nav class="navbar navbar-expand-lg bg-primary rounded">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <NavLink className="nav-link mx-3" style={{color: 'white'}} to="/home">Home</NavLink>
            <NavLink className="nav-link mx-3" style={{color: 'white'}} to="/rules">Rules</NavLink>
            <NavLink className="nav-link mx-3" style={{color: 'white'}} to="/leaderboard">Leaderboard</NavLink>
            <li class="nav-item dropdown mx-3">
              <button class="nav-link dropdown-toggle" style={{color: 'white'}} data-bs-toggle="dropdown" aria-expanded="false">
                {user.displayName}
              </button>
              <ul class="dropdown-menu">
                <li><button class="dropdown-item">Profile</button></li>
                <li><hr class="dropdown-divider" /></li>
                <li><button class="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
