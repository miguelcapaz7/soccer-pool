import React from "react";
import { useNavigate } from "react-router-dom";
import { GroupsData } from "../data/GroupsData";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  const rows = [];
  for (let i = 0; i < GroupsData.length; i += 4) {
    rows.push(GroupsData.slice(i, i + 4));
  }

  return (
    <MainLayout title="Welcome to the World Cup 2026 soccer pool!">
      {rows.map((row, rowIndex) => (
        <div className="row mb-4" key={rowIndex}>
          {row.map((group, colIndex) => (
            <div className="col" key={colIndex}>
              <div className={`card shadow-sm ${group.colour}`}>
                <div className="card-body text-center">
                  <h5 className="card-title">
                    Group {group.group}
                  </h5>
                  <ul className="list-group list-group-flush">
                    {group.teams.map((team, teamIndex) => (
                      <li
                        className="list-group-item border"
                        key={teamIndex}
                      >
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
      <div className="text-center">
        <Button onClick={() => navigate("/groupStagePicks")} color="success">Start</Button>
      </div>
    </MainLayout>
  );
};

export default Home;
