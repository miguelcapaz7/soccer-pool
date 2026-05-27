import { useNavigate } from "react-router-dom";

const useMarkPools = () => {
  const navigate = useNavigate();

  const menus = [
    { title: "Group Stage", path: "/groupStagePicks" },
    { title: "Standings", path: "/standings" },
    { title: "Knockout Stage", path: "/knockoutStagePicks" },
    { title: "Total Goals Prediction", path: "/totalGoalsPrediction" },
  ];

  return { navigate, menus }
};

export default useMarkPools;