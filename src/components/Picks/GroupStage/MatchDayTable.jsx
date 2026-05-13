import React from "react";
import GroupsData from "../../../data/GroupsData.js";
import {
  getMatchId,
  getGroupStageMatchups,
} from "../../../utils/Picks/GroupStage/groupStageUtils.js";

const MatchDayTable = ({
  matchDay,
  groupStagePicks,
  handlePick,
  clickable = true,
  review = false
}) => {
  const matchups = getGroupStageMatchups(matchDay);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-dark text-white text-center py-2">
        <h5 className="mb-0">Match Day {matchDay}</h5>
      </div>

      <div className="card-body p-0">
        <table className={`table table-sm ${clickable ? "table-hover" : ""} mb-0`}>
          <thead className="table-light">
            <tr>
              <th className="text-center small-col">Grp</th>
              <th className="text-center small-col">Home</th>
              <th className="text-center small-col">Tie</th>
              <th className="text-center small-col">Away</th>
            </tr>
          </thead>

          <tbody>
            {GroupsData.map((groupData) =>
              matchups.map(([i, j], matchIndex) => {
                const matchId = getMatchId(
                  matchDay,
                  groupData.group,
                  matchIndex
                );
                const result = groupStagePicks[matchId]?.result ?? null;
                const options = [groupData.teams[i], "Tie", groupData.teams[j]];
                const needsAttention = review && (result === "");

                return (
                  <tr key={matchId} className={needsAttention ? "table-danger" : ""}>
                    <td className="text-center fw-bold">{groupData.group}</td>
                    {options.map((option) => (
                      <td
                        key={option}
                        className={`text-center ${
                          result === option ? "table-primary" : ""
                        } ${clickable ? "clickable" : ""}`}
                        style={{
                          cursor: clickable ? "pointer" : "default",
                          minWidth: "70px",
                        }}
                        onClick={() => {
                          if (clickable) {
                            handlePick(matchId, option);
                          }
                        }}
                      >
                        {option !== "Tie" ? option : "–"}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatchDayTable;
