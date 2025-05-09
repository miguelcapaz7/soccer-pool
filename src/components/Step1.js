import React from "react";
import { teamsData } from "../data/teamsData";
import "../assets/styles/Step1.css";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/step2");
  };

  const generateMatches = (matchDay) => {
    return teamsData.map((groupData, groupIndex) => {
      const [team1, team2, team3, team4] = groupData.teams;
      return (
        <div key={groupIndex} className="group-table">
          <table>
            <thead>
              <tr>
                <th>Group</th>
                <th>Team 1</th>
                <th>Tie</th>
                <th>Team 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{groupData.group}</td>
                <td>{team1}</td>
                <td></td>
                <td>{team2}</td>
              </tr>
              <tr>
                <td>{groupData.group}</td>
                <td>{team3}</td>
                <td></td>
                <td>{team4}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div className="container py-4 text-center">
      <h2>STEP 1 - Select the team you predict will win in each match</h2>
      <p>2 pts for every correct prediction.</p>
      <div className="matchday-section">
        <div className="matchday-column">
          <h3>Match Day 1</h3>
          {generateMatches(1)}
        </div>
        <div className="matchday-column">
          <h3>Match Day 2</h3>
          {generateMatches(2)}
        </div>
        <div className="matchday-column">
          <h3>Match Day 3</h3>
          {generateMatches(3)}
        </div>
      </div>
      <button onClick={handleNext} className="next-btn">
        Next
      </button>
    </div>
  );
};

export default Step1;
