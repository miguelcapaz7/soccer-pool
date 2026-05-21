import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const usersDoc = doc(db, "users", currentUser.uid);
          const snapshot = await getDoc(usersDoc);
          setProfile(snapshot.exists() ? snapshot.data() : null);
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ 
    user, 
    profile,
    setProfile,
    loading 
  }), [user, profile, setProfile, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
