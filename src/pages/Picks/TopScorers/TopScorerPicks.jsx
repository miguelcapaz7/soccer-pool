import React from "react";
import PlayerPicker from "../../../components/Picks/TopScorers/PlayerPicker.jsx";
import useTopScorerPicks from "../../../hooks/Picks/TopScorers/useTopScorerPicks.js";
import useTotalGoalsPrediction from "../../../hooks/Picks/TopScorers/useTotalGoalsPrediction.js";

const TopScorerPicks = ({ user }) => {
  const {
    topScorers,
    topScorerError,
    handleTeamChange,
    handlePlayerChange,
    takenPlayers,
  } = useTopScorerPicks(user);
  const { goalPrediction, goalPredictionError, handleGoalInput } =
    useTotalGoalsPrediction(user);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
        {topScorers.map((pick, i) => (
          <div className="col" key={i}>
            <div className="card p-3 shadow-sm">
              <PlayerPicker
                key={i}
                index={i}
                pick={pick}
                onTeamChange={handleTeamChange}
                onPlayerChange={handlePlayerChange}
                takenPlayers={takenPlayers}
              />
            </div>
          </div>
        ))}
        {topScorerError && (
          <div className="text-danger mt-2">{topScorerError}</div>
        )}
      </div>
      <div className="card text-center shadow-sm p-4 mb-4 mx-auto">
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
    </>
  );
};

export default TopScorerPicks;
