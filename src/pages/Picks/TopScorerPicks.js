import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TeamsData } from "../../data/TeamsData";
import Button from "../../components/Button";
import MainLayout from "../../layouts/MainLayout";

const Step4 = () => {
  const navigate = useNavigate();

  const [selections, setSelections] = useState([
    { team: "", player: "" },
    { team: "", player: "" },
    { team: "", player: "" },
  ]);

  const handleTeamChange = (index, e) => {
    const newSelections = [...selections];
    newSelections[index].team = e.target.value;
    newSelections[index].player = ""; // reset player when team changes
    setSelections(newSelections);
  };

  const handlePlayerChange = (index, e) => {
    const newSelections = [...selections];
    newSelections[index].player = e.target.value;
    setSelections(newSelections);
  };

  const [goalPrediction, setGoalPrediction] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow digits
    if (/^\d*$/.test(value)) {
      setGoalPrediction(value);
      setError("");
    } else {
      setError("Please enter a valid number");
    }
  };

  const handleSubmit = () => {
    const incomplete = selections.some(sel => !sel.team || !sel.player);
    if (incomplete) {
      alert("Please select both a team and a player for each pick!");
      return;
    }
    if (goalPrediction === "" || isNaN(goalPrediction)) {
      setError("Please enter a valid number");
      return;
    }

    localStorage.setItem("topScorerPicks", JSON.stringify(selections));
    localStorage.setItem("goalPrediction", goalPrediction);
    navigate("/step5");
  };

  return (
    <MainLayout title={"STEP 4 - Choose 3 players from any team in the tournament"}>
      <p className="text-center">3 pts will be awarded for each goal that player scores.</p>
      <div className="row text-center">
        {selections.map((sel, i) => {
          const selectedTeamData = TeamsData.find(
            (t) => t.team === sel.team
          );
          return (
            <div className="col mb-4" key={i}>
              <label className="form-label fw-bold">Select Team:</label>
              <select
                className="form-select w-50 mx-auto"
                value={sel.team}
                onChange={(e) => handleTeamChange(i, e)}
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
                onChange={(e) => handlePlayerChange(i, e)}
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
            onChange={handleInputChange}
          />
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
        <Button onClick={() => navigate("/knockoutStagePicks")} color="dark">Back</Button>
        <Button onClick={() => navigate("/step4")} color="dark">Next</Button>
      </div>
    </MainLayout>
  );
};

export default Step4;