import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const usePicksSubmitted = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  return { user, profile, loading, navigate };
};

export default usePicksSubmitted;