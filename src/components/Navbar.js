import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/world-cup-2026-logo.jpg";

const Navbar = () => {
  const { user, isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-dark rounded">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center" to="/home">  
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-top"
            style={{ height: "35px", width: "auto" }}
          />
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <NavLink className="nav-link mx-3" style={{color: 'white'}} to="/home">Home</NavLink>
            <NavLink className="nav-link mx-3" style={{color: 'white'}} to="/rules">Rules</NavLink>
            <NavLink className="nav-link mx-3" style={{color: 'white'}} to="/leaderboard">Leaderboard</NavLink>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown mx-3">
              <button className="nav-link dropdown-toggle" style={{color: 'white'}} data-bs-toggle="dropdown" aria-expanded="false">
                {user.displayName}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {role === "Admin" && (
                  <li><button className="dropdown-item" onClick={() => navigate("/admin")}>Admin</button></li>
                )}
                <li><button className="dropdown-item" onClick={() => navigate("/profile")}>Profile</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
