import React from "react";
import { useNavigate } from "react-router-dom";
import { TeamsData } from "../../data/TeamsData";
import Button from "../../components/Button";
import MainLayout from "../../layouts/MainLayout";
import useTopScorerPicks from "../../hooks/Picks/useTopScorerPicks";

const TopScorerPicks = () => {
  const navigate = useNavigate();
  const {
      selections,
      goalPrediction,
      error,
      handleTeamChange,
      handlePlayerChange,
      handleGoalInput,
    } = useTopScorerPicks();



  return (
    <MainLayout title={"STEP 4 - Choose 3 players from any team in the tournament"}>
      <p className="text-center">3 pts will be awarded for each goal that player scores.</p>
      <div className="row text-center">
        {selections.map((sel, i) => {
          const selectedTeamData = TeamsData.find((t) => t.team === sel.team);
          return (
            <div className="col mb-4" key={i}>
              <label className="form-label fw-bold">Select Team:</label>
              <select
                className="form-select w-50 mx-auto"
                value={sel.team}
                onChange={(e) => handleTeamChange(i, e.target.value)}
              >
                <option value="">-- Choose a Team --</option>
                {TeamsData.map((teamObj, idx) => (
                  <option key={idx} value={teamObj.team}>
                    {teamObj.team}
                  </option>
                ))}
              </select>

              <label className="form-label fw-bold">Select Player:</label>
              <select
                className="form-select w-50 mx-auto"
                value={sel.player}
                onChange={(e) => handlePlayerChange(i, e.target.value)}
                disabled={!sel.team}
              >
                <option value="">-- Choose a Player --</option>
                {selectedTeamData?.players.map((player, idx) => (
                  <option key={idx} value={player}>
                    {player}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-5">
        <h2>STEP 5 - Predict the total amount of goals scored in the tournament</h2>
        <p>For tie breaker purpose only, predict the total amount of goals that will be scored in the tournament
          (excluding shootout goals). Closest without going over wins.
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
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
        <Button onClick={() => navigate("/knockoutStagePicks")} color="dark">Back</Button>
        <Button onClick={() => navigate("/reviewPicks")} color="dark">Next</Button>
      </div>
    </MainLayout>
  );
};

export default TopScorerPicks;