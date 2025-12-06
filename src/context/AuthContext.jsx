import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);

      if (currentUser) {
        try {
          const usersDoc = doc(db, "users", currentUser.uid);
          const snapshot = await getDoc(usersDoc);
          if (snapshot.exists()) {
            setProfile(snapshot.data());
          } else {
            setProfile(null);
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setProfile(null);
        }

        return;
      } 

      setProfile(null);

      const publicRoutes = ["/login", "/createAccount"];
      if (!publicRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const value = { user, isLoggedIn, profile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
