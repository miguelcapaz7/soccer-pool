import React from "react";
import { useNavigate } from "react-router-dom";
import { GroupsData } from "../data/GroupsData";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/Button";
import GroupTable from "../components/GroupTable";

const Home = () => {
  const navigate = useNavigate();

  const rows = [];
  for (let i = 0; i < GroupsData.length; i += 4) {
    rows.push(GroupsData.slice(i, i + 4));
  }

  const handleStart = () => {
    navigate("/groupStagePicks")
    window.scrollTo(0, 0)
  }

  return (
    <MainLayout title="Welcome to the World Cup 2026 soccer pool!">
      {rows.map((row, rowIndex) => (
        <div className="row mb-4" key={rowIndex}>
          {row.map((group, colIndex) => {
            const groupIndex = rowIndex * 4 + colIndex;
            return (
              <div className="col" key={colIndex}>
                <GroupTable group={group} groupIndex={groupIndex} draggable={false} />
              </div>
            );
          })}
        </div>
      ))}
      <div className="text-center">
        <Button onClick={handleStart} color="success">Start</Button>
      </div>
    </MainLayout>
  );
};

export default Home;
