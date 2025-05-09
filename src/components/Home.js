import React from "react";
import { useNavigate } from "react-router-dom";
import { teamsData } from "../data/teamsData";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/step1");
  };

  const rows = [];
  for (let i = 0; i < teamsData.length; i += 4) {
    const groupRow = teamsData.slice(i, i + 4);
    rows.push(groupRow);
  }

  return (
    <div>
      <div className="container py-4 text-center">
        <h2 className="text-center mb-4">
          Welcome to the World Cup 2026 soccer pool!
        </h2>
        {rows.map((row, rowIndex) => (
          <div className="row mb-4" key={rowIndex}>
            {row.map((group, colIndex) => (
              <div className="col" key={colIndex}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-center">Group {group.group}</h5>
                    <ul className="list-group list-group-flush">
                      {group.teams.map((team, teamIndex) => (
                        <li className="list-group-item text-center" key={teamIndex}>
                          {team}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <button onClick={handleStart} className="btn btn-primary">
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;
