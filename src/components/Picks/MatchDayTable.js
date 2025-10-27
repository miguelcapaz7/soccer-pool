// components/MatchDayTable.js
import React from "react";
import { GroupsData } from "../../data/GroupsData";
import { getMatchId, getGroupStageMatchups } from "../../utils/groupStageUtils";

const MatchDayTable = ({ matchDay, picks, handlePick }) => {
  const matchups = getGroupStageMatchups(matchDay)

  return (
    <div className="col">
      <h3 className="bg-dark text-white py-2 mb-3 rounded">
        Match Day {matchDay}
      </h3>
      <table className="table table-bordered mb-2 table-hover">
        <thead>
          <tr className="table-light">
            <th>Group</th>
            <th>Team 1</th>
            <th>Tie</th>
            <th>Team 2</th>
          </tr>
        </thead>
        <tbody>
          {GroupsData.map((groupData) => {
            const teams = groupData.teams;

            return matchups.map(([i, j], matchIndex) => {
              const matchId = getMatchId(matchDay, groupData.group, matchIndex)
              const selected = picks[matchId];
              const options = [teams[i], "Tie", teams[j]];

              return (
                <tr key={matchId}>
                  <td>{groupData.group}</td>
                  {options.map((option) => (
                    <td
                      key={option}
                      className={`clickable text-center ${
                        selected === option ? "table-primary" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => handlePick(matchId, option)}
                    >
                      {option !== "Tie" ? option : ""}
                    </td>
                  ))}
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MatchDayTable;