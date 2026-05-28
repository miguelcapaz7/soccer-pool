import React from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { HTML5Backend } from "react-dnd-html5-backend";
import useStandingsPicks from "../../../hooks/Picks/Standings/useStandingsPicks.js";
import GroupTable from "../../../components/GroupTable.jsx";
import ThirdPlaceTable from "../../../components/Picks/Standings/ThirdPlaceTable.jsx";

const StandingsPicks = ({ user }) => {
  const {
    groups,
    thirdPlaceTeams,
    selectedThirdPlaceTeams,
    moveTeam,
    toggleThirdPlaceTeam,
  } = useStandingsPicks(user);

  return (
    <>
      {/* Groups grid */}
      <div className="row g-2 g-md-3">
        {groups.map((group, index) => (
          <div
            className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"
            key={group.group}
          >
            <GroupTable
              group={group}
              groupIndex={index}
              moveTeam={moveTeam}
              draggable
              rankings
            />
          </div>
        ))}
      </div>

      {/* Third-place ranking */}
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-8 col-lg-6">
          <ThirdPlaceTable
            teams={thirdPlaceTeams}
            selectedTeams={selectedThirdPlaceTeams}
            toggleTeam={toggleThirdPlaceTeam}
          />
        </div>
      </div>
    </>
  );
};

export default StandingsPicks;
