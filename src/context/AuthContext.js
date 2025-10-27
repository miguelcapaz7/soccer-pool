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
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);

      if (currentUser) {
        try {
          const usersDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (usersDoc.exists()) {
            const data = usersDoc.data();
            setRole(data.role || "User");
          } else {
            setRole("User");
          }
        } catch (err) {
          console.error("Error fetching user role:", err);
          setRole(null);
        }
      } else {
        setRole(null);
      }

      const publicRoutes = ["/login", "/createAccount"];
      if (!currentUser && !publicRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  const value = { user, isLoggedIn, role };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
