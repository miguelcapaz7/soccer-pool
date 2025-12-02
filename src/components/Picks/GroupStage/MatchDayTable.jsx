// components/MatchDayTable.js
import React from "react";
import  GroupsData  from "../../../data/GroupsData.js";
import { getMatchId, getGroupStageMatchups } from "../../../utils/Picks/GroupStage/groupStageUtils.js";

const MatchDayTable = ({ matchDay, groupStagePicks, handlePick }) => {
  const matchups = getGroupStageMatchups(matchDay)

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-dark text-white text-center py-2">
        <h5 className="mb-0">Match Day {matchDay}</h5>
      </div>

      <div className="card-body p-0">
        <table className="table table-sm table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th className="small-col text-center">Grp</th>
              <th className="text-center small-col">Team 1</th>
              <th className="text-center small-col">Tie</th>
              <th className="text-center small-col">Team 2</th>
            </tr>
          </thead>

          <tbody>
            {GroupsData.map((groupData) =>
              matchups.map(([i, j], matchIndex) => {
                const matchId = getMatchId(matchDay, groupData.group, matchIndex);
                const { result } = groupStagePicks[matchId];
                const options = [groupData.teams[i], "Tie", groupData.teams[j]];

                return (
                  <tr key={matchId}>
                    <td className="text-center fw-bold">{groupData.group}</td>
                    {options.map(option => (
                      <td
                        key={option}
                        className={`text-center clickable ${
                          result === option ? "table-primary" : ""
                        }`}
                        style={{ cursor: "pointer", minWidth: "70px" }}
                        onClick={() => handlePick(matchId, option)}
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