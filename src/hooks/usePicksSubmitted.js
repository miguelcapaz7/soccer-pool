import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const usePicksSubmitted = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();

  useEffect(() => {
    if (profile !== undefined) {
      setLoading(false);
    }
  }, [profile]);

  return { user, profile, loading, navigate };
};

export default usePicksSubmitted;