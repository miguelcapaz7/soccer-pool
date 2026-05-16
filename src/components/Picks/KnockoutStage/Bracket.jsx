import React, { useMemo } from "react";
import logo from "../../../assets/images/world-cup-2026-logo.jpg";

const Bracket = React.memo(
  ({ bracket, handleSelectTeam, resetBracket, readOnly = false }) => {
    const stages = useMemo(
      () => ["Round of 32", "Round of 16", "Quarter Finals", "Semi Finals"],
      [],
    );

    const columnLabels = useMemo(
      () => [...stages, "Finals/3rd Place", ...stages.slice().reverse()],
      [stages],
    );

    const stagePts = useMemo(() => ["", "2 pts", "4 pts", "8 pts"], []);

    const stageLabels = useMemo(
      () => [...stagePts, "", ...stagePts.slice().reverse()],
      [stagePts],
    );

    return (
      <div className="bracket-inner">
        <img src={logo} alt="World Cup Logo" className="bracket-logo" />
        <div className="bracket-wrapper">
          <div className="d-flex bg-dark rounded mb-3">
            {columnLabels.map((label, index) => (
              <div
                key={index}
                className="bracket-label-col w-100 d-flex fw-bold py-2 text-white"
                style={{fontSize: "14px"}}
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
                  <div
                    key={matchId}
                    className="w-100 d-flex flex-column align-items-center"
                  >
                    <div className="bracket-match shadow-sm">
                      {/* Header */}
                      {(matchId === "F" ||
                        matchId === "3P" ||
                        matchId === "CHAMPION") && (
                        <div className="match-header">
                          {matchId === "F"
                            ? "FINAL"
                            : matchId === "3P"
                              ? "3RD PLACE"
                              : "CHAMPIONS"}
                        </div>
                      )}

                      {/* Champion */}
                      {matchId === "CHAMPION" ? (
                        <>
                        <div className="champion-box">{teams[0]}</div>
                        <div className="match-footer">20 pts</div>
                        </>
                      ) : (
                        <>
                          {teams.map((team, i) => {
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
                                      i,
                                    );
                                  }
                                }}
                              >
                                {team}
                              </div>
                            );
                          })}

                          {/* Footer */}
                          {(matchId === "F" ||
                            matchId === "3P" ||
                            matchId === "CHAMPION") && (
                            <div className="match-footer">
                              {matchId === "F"
                                ? "10 pts"
                                : matchId === "3P"
                                  ? "5 pts"
                                  : "CHAMPIONS"}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* PUT PTS LABELS HERE */}
          <div className="d-flex">
            {stageLabels.map((label, index) => (
              <div
                key={index}
                className="bracket-label-col w-100 d-flex py-2"
                style={{ fontSize: ".7rem" }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

export default Bracket;
