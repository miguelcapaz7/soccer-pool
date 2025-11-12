import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../../components/Button";
import Bracket from "../../../components/Picks/KnockoutStage/Bracket";
import useKnockoutStagePicks from "../../../hooks/Picks/KnockoutStage/useKnockoutStagePicks";

const KnockoutStagePicks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bracket, handleSelectTeam, loading } = useKnockoutStagePicks(user);

  const stages = useMemo (
    () => [
      "Round of 32",
      "Round of 16",
      "Quarter Finals",
      "Semi Finals",
    ], 
    []
  );

  const columnLabels = useMemo(
    () => [
      ...stages,
      "Finals + 3rd Place",
      ...stages.slice().reverse(),
    ], [stages]
  );

  const handleBack = () => {
    navigate("/standingsPicks")
    window.scrollTo(0, 0)
  }

  return (
    <div className="container-fluid py-5 text-center mt-5">
      <h2 className="mb-4">
        STEP 3 - Complete the bracket with your predictions for the knockout
        stages
      </h2>
      <div className="row text-center fw-bold mb-3">
        {columnLabels.map((colLabel, colLabelIndex) => (
          <div className="col" key={colLabelIndex}>
            {colLabel}
          </div>
        ))}
      </div>
      <Bracket bracket={bracket} handleSelectTeam={handleSelectTeam} />
      <Button onClick={handleBack} color="dark">Back</Button>
      <Button onClick={() => navigate("/topScorerPicks")} color="dark">Next</Button>
    </div>
  );
};

export default KnockoutStagePicks;