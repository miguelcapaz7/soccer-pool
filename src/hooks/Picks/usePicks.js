import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getPickSteps } from "../../utils/Picks/picksUtils";
import { useAuth } from "../../context/AuthContext";

const usePicks = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const location = useLocation();

  const pickSteps = getPickSteps();

  const stepData = pickSteps[step];
  const StepComponent = stepData.component;

  const containerClass = stepData.wider ? "page-container" : "container";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return { user, profile, navigate, stepData, StepComponent, containerClass };
};

export default usePicks;
