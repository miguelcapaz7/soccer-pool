// components/MatchDayTable.js
import React from "react";
import { GroupsData } from "../../data/GroupsData";

const MatchDayTable = ({ matchDay, picks, handlePick }) => {
  const getMatchups = (day) => {
    switch (day) {
      case 1: return [[0, 1], [2, 3]];
      case 2: return [[0, 2], [3, 1]];
      case 3: return [[3, 0], [1, 2]];
      default: return [];
    }
  };

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
            const matchups = getMatchups(matchDay);

            return matchups.map(([i, j], matchIndex) => {
              const matchId = `MD${matchDay}-G${groupData.group}-${matchIndex + 1}`;
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