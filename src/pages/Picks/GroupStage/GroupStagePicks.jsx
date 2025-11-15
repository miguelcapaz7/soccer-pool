import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useGroupStagePicks from "../../../hooks/Picks/GroupStage/useGroupStagePicks";
import Button from "../../../components/Button";
import MatchDayTable from "../../../components/Picks/GroupStage/MatchDayTable";
import MainLayout from "../../../layouts/MainLayout";

const GroupStagePicks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { groupStagePicks, handlePick } = useGroupStagePicks(user);

  const handleNext = () => {
    console.log("Selections:", groupStagePicks);
    navigate("/standingsPicks");
    window.scrollTo(0, 0);
  };

  return (
    <div className="container text-center py-5 mt-5">
      <div className="card mb-3 shadow-sm p-4">
        <h2>STEP 1 - Predict the Winners of Each Match</h2>
        <p className="text-muted mb-0">2 points for every correct prediction.</p>
      </div>
      <div className="row g-4">
        {[1, 2, 3].map((md) => (
          <div key={md} className="col-12 col-lg-4">
            <MatchDayTable
              matchDay={md}
              groupStagePicks={groupStagePicks}
              handlePick={handlePick}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Button onClick={handleNext} color="dark">
          Next
        </Button>
      </div>
    </div>
  );
};

export default GroupStagePicks;
