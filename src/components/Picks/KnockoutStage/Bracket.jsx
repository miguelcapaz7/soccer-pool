import React from "react";

const Bracket = React.memo(({ bracket, handleSelectTeam }) => {
  const renderColumn = (colIndex) => (
    <div
      className="bracket-col d-flex flex-column align-items-center"
      key={colIndex}
    >
      {bracket[colIndex]?.map(({ matchId, teams }, matchupIndex) => (
        <div key={matchId} className="bracket-match shadow-sm">
          {matchId === "CHAMPION" ? (
            <div className="champion-box">{teams[0]}</div>
          ) : (
            teams.map((team, i) => {
              const isThirdPlaceWinner =
              matchId === "3P" &&
                bracket.thirdPlaceWinner &&
                bracket.thirdPlaceWinner[0] !== "" &&
                bracket.thirdPlaceWinner[0] === team;

              return (
                <div
                  key={i}
                  className={`team-row ${
                    isThirdPlaceWinner ? "third-winner" : ""
                  }`}
                  onClick={() =>
                    handleSelectTeam(matchId, colIndex, matchupIndex, i)
                  }
                >
                  {team}
                </div>
              );
            })
          )}
        </div>
      ))}
    </div>
  );

  return <>{bracket.map((_, colIndex) => renderColumn(colIndex))}</>;
});

export default Bracket;
