import React from "react";
import { useNavigate } from "react-router-dom";
import GroupsData from "../data/GroupsData.js";
import MainLayout from "../layouts/MainLayout.jsx";
import Button from "../components/Button.jsx";
import GroupTable from "../components/GroupTable.jsx";

const Home = () => {
  const navigate = useNavigate();

  return (
    <MainLayout title="FIFA World Cup 2026 Soccer Pool">
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
        <Button onClick={() => navigate("/picks/groupStagePicks")} color="success">
          Start
        </Button>
      </div>
    </MainLayout>
  );
};

export default Home;
