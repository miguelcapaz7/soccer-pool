import React from "react";
import "../assets/styles/Home.css";
import { useNavigate } from "react-router-dom";
import { teamsData } from "../data/teamsData";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/step1");
  };

  const generateGroups = () => {
    return teamsData.map((groupData, groupIndex) => {
      const [team1, team2, team3, team4] = groupData.teams;
      return (
        <div key={groupIndex} className="group-box">
          <h3 data-group={groupData.group}>Group {groupData.group}</h3>
          <ul>
            <li>{team1}</li>
            <li>{team2}</li>
            <li>{team3}</li>
            <li>{team4}</li>
          </ul>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="container-fluid text-center">
        <h1>Soccer fans, welcome to the World Cup 2026 soccer pool!</h1>
        <p>
          Before starting, please view the <a href="/rules">rules</a>.
        </p>
        <p>
          Below are the teams and their respective groups that will be competing
          in the tournament. Good luck everyone!
        </p>
        <div className="group-container">{generateGroups()}</div>

        <button onClick={handleStart} className="start-button">
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;
