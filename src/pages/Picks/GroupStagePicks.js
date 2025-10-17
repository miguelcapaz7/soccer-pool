import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useGroupStagePicks from "../../hooks/Picks/useGroupStagePicks";
import Button from "../../components/Button";
import MatchDayTable from "../../components/Picks/MatchDayTable";

const GroupStagePicks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { picks, handlePick } = useGroupStagePicks(user);

  const handleNext = () => {
    console.log("Selections:", picks);
    navigate("/standingsPicks");
    window.scrollTo(0, 0);
  };

  return (
    <div className="container py-5 text-center mt-5">
      <h2>STEP 1 - Select the team you predict will win in each match</h2>
      <p>2 pts for every correct prediction.</p>
      <div className="row mb-4">
        {[1, 2, 3].map((matchDay) => (
          <MatchDayTable
            key={matchDay}
            matchDay={matchDay}
            picks={picks}
            handlePick={handlePick}
          />
        ))}
      </div>
      <Button onClick={handleNext} color="dark">Next</Button>
    </div>
  );
};

export default GroupStagePicks;