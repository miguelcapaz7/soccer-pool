import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import PlayerPicker from "../../../components/Picks/TopScorers/PlayerPicker";
import MainLayout from "../../../layouts/MainLayout";
import { useAuth } from "../../../context/AuthContext";
import useTopScorerPicks from "../../../hooks/Picks/TopScorers/useTopScorerPicks";
import useTotalGoalsPrediction from "../../../hooks/Picks/TopScorers/useTotalGoalsPrediction";

const TopScorerPicks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selections, topScorerError, handleTeamChange, handlePlayerChange } =
    useTopScorerPicks(user);
  const { goalPrediction, goalPredictionError, handleGoalInput } =
    useTotalGoalsPrediction(user);

  return (
    <div className="container text-center py-5 mt-5">
      <div className="card shadow-sm p-4 mb-4 mx-auto">
        <h2 className="mb-3">
          STEP 4 - Choose 3 players from any team in the tournament
        </h2>
        <p className="text-muted mb-0">
          3 pts will be awarded for each goal that player scores.
        </p>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
        {selections.map((sel, i) => (
          <div className="col" key={i}>
            <div className="card p-3 shadow-sm">
              <PlayerPicker
                key={i}
                index={i}
                selection={sel}
                onTeamChange={handleTeamChange}
                onPlayerChange={handlePlayerChange}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="card shadow-sm p-4 mb-4 mx-auto">
        <h2 className="mb-3">
          STEP 5 - Predict the total amount of goals scored in the tournament
        </h2>
        <p>
          For tie breaker purpose only, predict the total amount of goals that
          will be scored in the tournament (excluding shootout goals). Closest
          without going over wins.
        </p>
      </div>
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
        {goalPredictionError && (
          <div className="text-danger mt-2">{goalPredictionError}</div>
        )}
      </div>
      <div className="text-center mt-4">
        <Button onClick={() => navigate("/knockoutStagePicks")} color="dark">
          Back
        </Button>
        <Button onClick={() => navigate("/reviewPicks")} color="dark">
          Next
        </Button>
      </div>
    </div>
  );
};

export default TopScorerPicks;
