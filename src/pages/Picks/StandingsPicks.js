import React from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAuth } from "../../context/AuthContext";
import useStandingsPicks from "../../hooks/Picks/useStandingsPicks";
import Button from "../../components/Button";
import GroupTable from "../../components/GroupTable";

const StandingsPicks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { groups, moveTeam } = useStandingsPicks(user);

  const handleNext = () => {
    navigate("/knockoutStagePicks");
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    navigate("/groupStagePicks");
    window.scrollTo(0, 0);
  };

  const rows = [];
  for (let i = 0; i < groups.length; i += 4) {
    rows.push(groups.slice(i, i + 4));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container py-5 text-center mt-5">
        <h1>STEP 2 - Predict the top 2 teams to advance from each group</h1>
        <p>
          2 pts for every correct team selected. Bonus of 2 points if they are
          in the correct order of finishing 1st or 2nd in the group.
        </p>
        {rows.map((row, rowIndex) => (
          <div className="row mb-4" key={rowIndex}>
            {row.map((group, colIndex) => {
              const groupIndex = rowIndex * 4 + colIndex;
              return (
                <div className="col" key={colIndex}>
                  <GroupTable
                    key={colIndex}
                    group={group}
                    groupIndex={groupIndex}
                    moveTeam={moveTeam}
                    draggable={true}
                  />
                </div>
              );
            })}
          </div>
        ))}
        <Button onClick={handleBack} color="dark">Back</Button>
        <Button onClick={handleNext} color="dark">Next</Button>
      </div>
    </DndProvider>
  );
};

export default StandingsPicks;
