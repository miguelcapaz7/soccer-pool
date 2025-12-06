import React from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuth } from "../../../context/AuthContext.jsx";
import useStandingsPicks from "../../../hooks/Picks/Standings/useStandingsPicks.js";
import Button from "../../../components/Button.jsx";
import GroupTable from "../../../components/GroupTable.jsx";
import ThirdPlaceTable from "../../../components/Picks/Standings/ThirdPlaceTable.jsx";

const StandingsPicks = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { groups, thirdPlaceOrder, moveTeam, moveThirdPlaceTeam } =
    useStandingsPicks(user);

  if (!profile) return null;

  if (profile.picksSubmitted) {
    return (
      <div className="container text-center py-5 mt-5">
        <h2>You have already submitted your picks.</h2>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container text-center py-5 mt-5">
        <div className="card mb-3 shadow-sm p-4">
          <h2>STEP 2 — Group Stage Predictions</h2>
          <p className="text-muted mb-0">
            Drag & drop to rank the top 2 in each group.
            2 points for each correct team, +2 bonus if the order is
            exact.
          </p>
        </div>

        {/* Groups Grid */}
        <div className="row g-4">
          {groups.map((group, index) => (
            <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={group.group}>
              <GroupTable
                group={group}
                groupIndex={index}
                moveTeam={moveTeam}
                draggable={true}
              />
            </div>
          ))}
        </div>

        {/* Third-place ranking */}
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-8 col-lg-6">
            <ThirdPlaceTable
              teams={thirdPlaceOrder}
              moveTeam={moveThirdPlaceTeam}
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <Button onClick={() => navigate("/groupStagePicks")} color="dark" className="mx-2 px-4">
            Back
          </Button>
          <Button onClick={() => navigate("/knockoutStagePicks")} color="dark" className="mx-2 px-4">
            Next
          </Button>
        </div>
      </div>
    </DndProvider>
  );
};

export default StandingsPicks;
