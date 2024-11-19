import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import authPersistence from './authPersistence';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthStatus(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // authPersistence();
    if (!authStatus && !user) {
      navigate('/login');
    }
  }, [authStatus, user, navigate]);

  return { user, authStatus };
};

export default useAuth;