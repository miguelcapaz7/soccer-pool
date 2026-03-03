import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return { user, navigate }
};

export default useProfile;
