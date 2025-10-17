import { useState } from "react";

const useTopScorerPicks = () => {
  const [selections, setSelections] = useState([
    { team: "", player: "" },
    { team: "", player: "" },
    { team: "", player: "" },
  ]);
  const [goalPrediction, setGoalPrediction] = useState("");
  const [error, setError] = useState("");

  const handleTeamChange = (index, value) => {
    const updated = [...selections];
    updated[index].team = value;
    updated[index].player = "";
    setSelections(updated);
  };

  const handlePlayerChange = (index, value) => {
    const updated = [...selections];
    updated[index].player = value;
    setSelections(updated);
  };

  const handleGoalInput = (value) => {
    if (/^\d*$/.test(value)) {
      setGoalPrediction(value);
      setError("");
    } else {
      setError("Please enter a valid number");
    }
  };

  const validate = () => {
    const incomplete = selections.some(sel => !sel.team || !sel.player);
    if (incomplete) {
      setError("Please select both a team and a player for each pick!");
      return false;
    }
    if (goalPrediction === "" || isNaN(goalPrediction)) {
      setError("Please enter a valid number");
      return false;
    }
    return true;
  };

  return {
    selections,
    goalPrediction,
    error,
    handleTeamChange,
    handlePlayerChange,
    handleGoalInput,
    validate,
  };
};

export default useTopScorerPicks;