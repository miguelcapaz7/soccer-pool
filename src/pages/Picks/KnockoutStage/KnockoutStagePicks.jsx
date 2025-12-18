import React, { useMemo } from "react";
import Button from "../../../components/Button.jsx";
import Bracket from "../../../components/Picks/KnockoutStage/Bracket.jsx";
import useKnockoutStagePicks from "../../../hooks/Picks/KnockoutStage/useKnockoutStagePicks.js";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/Bracket.css";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const KnockoutStagePicks = ({ user }) => {
  const navigate = useNavigate();
  const { bracket, handleSelectTeam, loading, missingStep2, resetMatch } =
    useKnockoutStagePicks(user);

  if (loading) {
    return <LoadingSpinner />;
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
      <Bracket
        bracket={bracket}
        handleSelectTeam={handleSelectTeam}
        resetMatch={resetMatch}
      />
    </div>
  );
};

export default KnockoutStagePicks;
