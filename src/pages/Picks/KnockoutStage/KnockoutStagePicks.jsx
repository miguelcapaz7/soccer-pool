import React, { useMemo } from "react";
import Button from "../../../components/Button.jsx";
import Bracket from "../../../components/Picks/KnockoutStage/Bracket.jsx";
import useKnockoutStagePicks from "../../../hooks/Picks/KnockoutStage/useKnockoutStagePicks.js";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/world-cup-2026-logo.jpg";
import "../../../assets/styles/Bracket.css";

const KnockoutStagePicks = ({ user }) => {
  const navigate = useNavigate()
  const { bracket, handleSelectTeam, loading, missingStep2, resetMatch } =
    useKnockoutStagePicks(user);

  const stages = useMemo(
    () => ["Round of 32", "Round of 16", "Quarter Finals", "Semi Finals"],
    []
  );

  const columnLabels = useMemo(
    () => [...stages, "Finals/3rd Place", ...stages.slice().reverse()],
    [stages]
  );

  if (loading) {
    return <div className="text-center py-5 mt-5">Loading...</div>;
  }

  if (missingStep2) {
    return (
      <div className="text-center py-4">
        <p className="mb-3 text-danger">
          Please complete Step 2 before proceeding to the knockout stage.
        </p>
        <Button color="dark" onClick={() => navigate("/picks/standingsPicks")}>
          Go to Step 2
        </Button>
      </div>
    );
  }

  return (
    <div className="bracket-scroll-wrapper">
      <div className="bracket-inner">
        <img src={logo} alt="World Cup Logo" className="bracket-logo" />
        <Bracket
          bracket={bracket}
          handleSelectTeam={handleSelectTeam}
          resetMatch={resetMatch}
          columnLabels={columnLabels}
        />
      </div>
    </div>
  );
};

export default KnockoutStagePicks;
