import React from "react";
import useGroupStagePicks from "../../../hooks/Picks/GroupStage/useGroupStagePicks.js";
import MatchDayTable from "../../../components/Picks/GroupStage/MatchDayTable.jsx";

const GroupStagePicks = ({ user }) => {
  const { groupStagePicks, handlePick } = useGroupStagePicks(user);

  return (
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
  );
};

export default GroupStagePicks;
