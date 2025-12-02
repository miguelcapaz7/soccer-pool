import React from "react";
import { useNavigate } from "react-router-dom";
import { GroupsData } from "../data/GroupsData.js";
import MainLayout from "../layouts/MainLayout.jsx";
import Button from "../components/Button.jsx";
import GroupTable from "../components/GroupTable.jsx";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/groupStagePicks")
    window.scrollTo(0, 0)
  }

  return (
    <MainLayout title="Welcome to the World Cup 2026 soccer pool!">
      <div className="row g-4">
          {GroupsData.map((group, index) => (
            <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={index}>
              <GroupTable
                group={group}
                groupIndex={index}
                moveTeam={false}
                draggable={false}
              />
            </div>
          ))}
        </div>
      <div className="text-center mt-4">
        <Button onClick={handleStart} color="success">Start</Button>
      </div>
    </MainLayout>
  );
};

export default Home;
