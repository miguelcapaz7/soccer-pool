import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import Button from "../../../components/Button.jsx";
import Bracket from "../../../components/Picks/KnockoutStage/Bracket.jsx";
import useKnockoutStagePicks from "../../../hooks/Picks/KnockoutStage/useKnockoutStagePicks.js";
import "../../../assets/styles/Bracket.css";

const KnockoutStagePicks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bracket, handleSelectTeam, loading, missingStep2 } = useKnockoutStagePicks(user);

  const stages = useMemo(
    () => ["Round of 32", "Round of 16", "Quarter Finals", "Semi Finals"],
    []
  );

  const columnLabels = useMemo(
    () => [...stages, "Finals/3rd Place", ...stages.slice().reverse()],
    [stages]
  );

  const handleBack = () => {
    navigate("/standingsPicks");
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <div className="text-center py-5 mt-5">Loading...</div>;
  }

  if (missingStep2) {
    return (
      <div className="text-center py-5 mt-5">
        <h2 className="mb-3">Please complete Step 2 before proceeding to the knockout stage.</h2>
        <Button color="primary" onClick={() => navigate("/standingsPicks")}>
          Go to Step 2
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container py-5 text-center mt-5">
      <div className="card shadow-sm p-4 mb-4 mx-auto">
        <h2 className="mb-3">
          STEP 3 - Complete the bracket with your predictions for the knockout
          stages
        </h2>
        <p className="text-muted mb-0">Click a team to advance them.</p>
      </div>
      <div className="d-flex justify-content-center">
        {columnLabels.map((colLabel, colLabelIndex) => (
          <div
            className="bracket-label-col text-center fw-bold py-2"
            key={colLabelIndex}
          >
            {colLabel}
          </div>
        ))}
      </div>
      <div className="mb-4 d-flex justify-content-center" style={{position: 'relative'}}>
        <img
          src="src/assets/images/world-cup-2026-logo.jpg"  // ✅ Replace with your logo path
          alt="World Cup Logo"
          className="bracket-logo"
        />
        <Bracket bracket={bracket} handleSelectTeam={handleSelectTeam} />
      </div>
      <Button onClick={handleBack} color="dark">
        Back
      </Button>
      <Button onClick={() => navigate("/topScorerPicks")} color="dark">
        Next
      </Button>
    </div>
  );
};

export default KnockoutStagePicks;
