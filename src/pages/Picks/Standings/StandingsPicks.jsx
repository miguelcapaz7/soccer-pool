import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useStandingsPicks from "../../../hooks/Picks/Standings/useStandingsPicks.js";
import GroupTable from "../../../components/GroupTable.jsx";
import ThirdPlaceTable from "../../../components/Picks/Standings/ThirdPlaceTable.jsx";

const StandingsPicks = ({ user }) => {
  const { groups, thirdPlaceTeams, selectedThirdPlaceTeams, moveTeam, toggleThirdPlaceTeam } =
    useStandingsPicks(user);

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Groups Grid */}
      <div className="row g-4">
        {groups.map((group, index) => (
          <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={group.group}>
            <GroupTable
              group={group}
              groupIndex={index}
              moveTeam={moveTeam}
              draggable={true}
              rankings={true}
            />
          </div>
        ))}
      </div>
      {/* Third-place ranking */}
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-8 col-lg-6">
          <ThirdPlaceTable
            teams={thirdPlaceTeams}
            selectedTeams={selectedThirdPlaceTeams}
            toggleTeam={toggleThirdPlaceTeam}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default StandingsPicks;
