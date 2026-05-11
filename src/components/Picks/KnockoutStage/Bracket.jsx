import React, { useMemo } from "react";
import logo from "../../../assets/images/world-cup-2026-logo.jpg";

const Bracket = React.memo(
  ({ bracket, handleSelectTeam, resetBracket, readOnly = false }) => {
    const stages = useMemo(
      () => ["Round of 32", "Round of 16", "Quarter Finals", "Semi Finals"],
      []
    );

    const columnLabels = useMemo(
      () => [...stages, "Finals/3rd Place", ...stages.slice().reverse()],
      [stages]
    );
    return (
      <div className="bracket-inner">
        <img src={logo} alt="World Cup Logo" className="bracket-logo" />
        <div className="bracket-wrapper">
          <div className="d-flex">
            {columnLabels.map((label, index) => (
              <div
                key={index}
                className="bracket-label-col w-100 d-flex fw-bold py-2"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="bracket-columns d-flex">
            {bracket.map((_, colIndex) => (
              <div
                className="bracket-col d-flex flex-column align-items-center"
                key={colIndex}
              >
                {bracket[colIndex]?.map(({ matchId, teams }, matchupIndex) => (
                  <div key={matchId} className="bracket-match shadow-sm">
                    {/* Champion */}
                    {matchId === "CHAMPION" ? (
                      <div className="champion-box">{teams[0]}</div>
                    ) : (
                      teams.map((team, i) => {
                        const isThirdPlaceWinner =
                          matchId === "3P" &&
                          bracket.thirdPlaceWinner &&
                          bracket.thirdPlaceWinner[0] &&
                          bracket.thirdPlaceWinner[0] === team;

                        return (
                          <div
                            key={i}
                            className={`team-row ${
                              isThirdPlaceWinner ? "third-winner" : ""
                            }`}
                            onClick={() => {
                              if (!readOnly) {
                                handleSelectTeam(
                                  matchId,
                                  colIndex,
                                  matchupIndex,
                                  i
                                );
                              }
                            }}
                          >
                            {team}
                          </div>
                        );
                      })
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default Bracket;
