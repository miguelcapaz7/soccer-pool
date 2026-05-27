import React, { useMemo } from "react";
import Button from "../../../components/Button.jsx";
import Bracket from "../../../components/Picks/KnockoutStage/Bracket.jsx";
import useKnockoutStagePicks from "../../../hooks/Picks/KnockoutStage/useKnockoutStagePicks.js";
import "../../../assets/styles/Bracket.css";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const KnockoutStagePicks = ({ user }) => {
  const {
    bracket,
    handleSelectTeam,
    loading,
    missingStep2,
    resetBracket,
    navigate,
  } = useKnockoutStagePicks(user);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (missingStep2) {
    return (
      <div className="py-4 text-center d-flex align-items-center justify-content-center">
        <div className="alert alert-warning shadow-sm" role="alert">
          <h5 className="mb-2">Step 2 Required</h5>
          <p className="mb-3">
            Please complete Step 2 before proceeding to the knockout stage.
          </p>
          <Button
            color="dark"
            onClick={() => navigate("/picks/standingsPicks")}
          >
            Go to Step 2
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bracket-scroll-wrapper">
        <Bracket
          bracket={bracket}
          handleSelectTeam={handleSelectTeam}
          resetBracket={resetBracket}
        />
      </div>
      <div className="text-center">
        <Button color="dark" className="" onClick={resetBracket}>
          Reset Bracket
        </Button>
      </div>
    </>
  );
};

export default KnockoutStagePicks;
