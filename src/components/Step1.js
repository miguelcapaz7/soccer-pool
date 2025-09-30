import React, { useState } from "react";
import { teamsData } from "../data/teamsData";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const navigate = useNavigate();
  const [picks, setPicks] = useState({});

  const handleNext = () => {
    console.log("Selections:", picks);
    navigate("/step2");
  };

  const handlePick = (matchId, selection) => {
    setPicks((prev) => {
      if (prev[matchId] === selection) {
        const updated = { ...prev };
        delete updated[matchId];
        return updated;
      }
      return {
        ...prev,
        [matchId]: selection
      };
    });
  };

  const generateMatches = (matchDay) => {
    return (
      <div className="col">
        <h3 className="bg-dark text-white py-2 mb-3 rounded">Match Day {matchDay}</h3>
        <table className="table table-bordered mb-2 table-hover">
          <thead>
            <tr className="table-light">
              <th>Group</th>
              <th>Team 1</th>
              <th>Tie</th>
              <th>Team 2</th>
            </tr>
          </thead>
          <tbody>
            {teamsData.map((groupData, groupIndex) => {
              const teams = groupData.teams;
              let matchups = []
              switch (matchDay) {
                case 1:
                  matchups = [
                    [0, 1],
                    [2, 3]
                  ];
                  break;
                case 2:
                  matchups = [
                    [0, 2],
                    [3, 1]
                  ];
                  break;
                case 3:
                  matchups = [
                    [3, 0],
                    [1, 2]
                  ];
                  break;
                default:
                  return null;
              }
              return matchups.map(([i, j], matchIndex) => {
                const matchId = `MD${matchDay}-G${groupData.group}-${matchIndex+1}`;
                const selected = picks[matchId];

                return (
                  <tr key={matchId}>
                    <td>{groupData.group}</td>
                    <td 
                      className={`clickable text-center ${selected === teams[i] ? "table-primary" : ""}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePick(matchId, teams[i])}
                    >
                      {teams[i]}
                    </td>
                    <td 
                      className={`clickable text-center ${selected === "Tie" ? "table-primary" : ""}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePick(matchId, "Tie")}
                    >
                    </td>
                    <td 
                      className={`clickable text-center ${selected === teams[j] ? "table-primary" : ""}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePick(matchId, teams[j])}
                    >
                      {teams[j]}
                    </td>
                  </tr>
                )
              });
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container py-5 text-center">
      <h2>STEP 1 - Select the team you predict will win in each match</h2>
      <p>2 pts for every correct prediction.</p>
      <div className="row">
          {generateMatches(1)}
          {generateMatches(2)}
          {generateMatches(3)}
      </div>
      <br></br>
      <button onClick={handleNext} className="btn btn-dark">
        Next
      </button>
    </div>
  );
};

export default Step1;
