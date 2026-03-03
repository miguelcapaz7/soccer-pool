import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useMarkPools = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const menus = [
    { title: "Step 1 - Group Stage", path: "/groupStagePicks" },
    { title: "Step 2 - Standings", path: "/standings" },
    { title: "Step 3 - Knockout Stage", path: "/knockoutStagePicks" },
    { title: "Step 4 - Top Scorers", path: "/topScorerPicks" },
    { title: "Step 5 - Total Goals Prediction", path: "/totalGoalsPrediction" },
  ];

  return { user, profile, navigate, menus }
};

export default useMarkPools;