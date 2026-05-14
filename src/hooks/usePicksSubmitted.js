import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const usePicksSubmitted = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  return { user, profile, navigate };
};

export default usePicksSubmitted;