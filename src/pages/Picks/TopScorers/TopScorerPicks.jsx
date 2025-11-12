import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import PlayerPicker from "../../../components/Picks/TopScorers/PlayerPicker";
import MainLayout from "../../../layouts/MainLayout";
import useTopScorerPicks from "../../../hooks/Picks/TopScorers/useTopScorerPicks";
import useTotalGoalsPrediction from "../../../hooks/Picks/TopScorers/useTotalGoalsPrediction";

const TopScorerPicks = () => {
  const navigate = useNavigate();
  const { selections, topScorerError, handleTeamChange, handlePlayerChange, } = useTopScorerPicks();
  const { goalPrediction, goalPredictionError, handleGoalInput } = useTotalGoalsPrediction();

  return (
    <MainLayout
      title={"STEP 4 - Choose 3 players from any team in the tournament"}
    >
      <p className="text-center">
        3 pts will be awarded for each goal that player scores.
      </p>
      <div className="row text-center">
        {selections.map((sel, i) => (
          <PlayerPicker
            key={i}
            index={i}
            selection={sel}
            onTeamChange={handleTeamChange}
            onPlayerChange={handlePlayerChange}
          />
        ))}
      </div>
      <div className="text-center mt-5">
        <h2>
          STEP 5 - Predict the total amount of goals scored in the tournament
        </h2>
        <p>
          For tie breaker purpose only, predict the total amount of goals that
          will be scored in the tournament (excluding shootout goals). Closest
          without going over wins.
        </p>
        <div className="d-flex flex-column align-items-center mt-4">
          <label htmlFor="goalPrediction" className="form-label fw-bold">
            Enter your prediction:
          </label>
          <input
            id="goalPrediction"
            type="text"
            className="form-control w-25 text-center"
            placeholder="e.g. 145"
            value={goalPrediction}
            onChange={(e) => handleGoalInput(e.target.value)}
          />
          {goalPredictionError && <div className="text-danger mt-2">{goalPredictionError}</div>}
        </div>
        <Button onClick={() => navigate("/knockoutStagePicks")} color="dark">
          Back
        </Button>
        <Button onClick={() => navigate("/reviewPicks")} color="dark">
          Next
        </Button>
      </div>
    </MainLayout>
  );
};

export default TopScorerPicks;
