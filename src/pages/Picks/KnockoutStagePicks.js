import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import Bracket from "../../components/Picks/Bracket";
import useKnockoutStage from "../../hooks/Picks/useKnockoutStagePicks";

const KnockoutStagePicks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { step2Results, loading } = useKnockoutStage(user);

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
        {columnLabels.map((colLabel, idx) => (
          <div className="col" key={idx}>
            {colLabel}
          </div>
        ))}
      </div>
      <Bracket step2Results={step2Results} isLoading={loading} />
      <Button onClick={handleBack} color="dark">Back</Button>
      <Button onClick={() => navigate("/topScorerPicks")} color="dark">Next</Button>
    </div>
  );
};

export default KnockoutStagePicks;