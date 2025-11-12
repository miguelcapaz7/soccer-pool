import React from "react";

const Bracket = React.memo(({ bracket, handleSelectTeam }) => {
  const renderColumn = (colIndex) => (
    <div
      className="col d-flex flex-column justify-content-around"
      key={colIndex}
    >
      {bracket[colIndex]?.map(({ matchId, teams }, matchupIndex) => (
        <table
          className="table table-bordered mb-2"
          key={matchId}
          style={{ transition: "none" }}
        >
          <tbody>
            {teams.map((team, teamIndex) => (
              <tr
                key={teamIndex}
                onClick={() => handleSelectTeam(matchId, colIndex, matchupIndex, teamIndex)}
                style={{ cursor: "pointer", height: "41px" }}
              >
                <td>{team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );

  return (
    <div className="row text-center d-flex" style={{ transition: "none" }}>
      {bracket.map((_, colIndex) => renderColumn(colIndex))}
    </div>
  );
});

export default Bracket;