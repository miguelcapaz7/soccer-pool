import React from "react";
import GroupsData from "../../../data/GroupsData.js";
import {
  getMatchId,
  getGroupStageMatchups,
} from "../../../utils/Picks/GroupStage/groupStageUtils.js";
import MatchRow from "./MatchRow.jsx";

const MatchDayTable = ({
  matchDay,
  groupStagePicks,
  handlePick,
  clickable = true,
  review = false,
}) => {
  const matchups = getGroupStageMatchups(matchDay);

  const rows = GroupsData.flatMap((groupData) =>
    matchups.map(([i, j], matchIndex) => {
      const matchId = getMatchId(matchDay, groupData.group, matchIndex);
      const result = groupStagePicks[matchId]?.result ?? null;
      return {
        matchId,
        group: groupData.group,
        home: groupData.teams[i],
        away: groupData.teams[j],
        result,
        needsAttention: review && result === "",
      };
    }),
  );

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-dark text-white text-center py-2">
        <h5 className="mb-0">Match Day {matchDay}</h5>
      </div>

      <div className="card-body p-0">
        <div
          className="d-flex align-items-center gap-2 px-2 py-1 border-bottom bg-light small text-muted fw-semibold text-uppercase"
          style={{ letterSpacing: "0.3px" }}
        >
          <div className="btn-group w-100">
            <div className="text-center" style={{ flex: "1 1 0" }}>Home</div>
            <div className="text-center" style={{ flex: "0 0 4rem" }}>Tie</div>
            <div className="text-center" style={{ flex: "1 1 0" }}>Away</div>
          </div>
        </div>

        {rows.map((row) => (
          <MatchRow
            key={row.matchId}
            matchId={row.matchId}
            group={row.group}
            home={row.home}
            away={row.away}
            currentPick={row.result}
            clickable={clickable}
            needsAttention={row.needsAttention}
            onPick={handlePick}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchDayTable;
