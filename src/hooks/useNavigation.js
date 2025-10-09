import { useNavigate } from "react-router-dom";

export const useStepNavigation = () => {
  const navigate = useNavigate();

  const goTo = (path, state = {}) => {
    navigate(path, { state });
  };

  return { goTo };
};