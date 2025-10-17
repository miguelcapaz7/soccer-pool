import React, { useState, useEffect } from "react";
import { generateEmptyBracket } from "../../utils/generateEmptyBracket";
import { generateRoundOf32 } from "../../utils/generateRoundOf32.js";

const Bracket = React.memo(({ step2Results, isLoading }) => {
  const [bracket, setBracket] = useState([]);

  useEffect(() => {
    setBracket(generateEmptyBracket())
  }, []);

  useEffect(() => {
    if (step2Results.length === 0) return;
    const roundOf32 = generateRoundOf32(step2Results)
    setBracket((prev) => {
      const updated = prev.map((col) => col.map((match) => [...match]));
      updated[0] = roundOf32.slice(0, 8);
      updated[8] = roundOf32.slice(8, 16);
      return updated;
    });
  }, [step2Results]);

  const handleSelectTeam = (colIndex, matchIndex, teamIndex) => {
    const teamName = bracket[colIndex][matchIndex][teamIndex];
    if (!teamName) return;

    setBracket((prev) => {
      const updated = prev.map((col) => col.map((match) => [...match]));

      const totalCols = updated.length;
      const midPoint = Math.floor(totalCols / 2);
      const isLeftSide = colIndex < midPoint;

      const nextCol = isLeftSide ? colIndex + 1 : colIndex - 1;
      const nextMatchIndex = Math.floor(matchIndex / 2);
      const nextSlot = matchIndex % 2 === 0 ? 0 : 1;

      if (
        (isLeftSide && nextCol > midPoint) ||
        (!isLeftSide && nextCol < midPoint)
      ) {
        return updated;
      }

      if (
        (isLeftSide && nextCol === midPoint) ||
        (!isLeftSide && nextCol === midPoint)
      ) {
        const semis = updated[colIndex];
        const opponentName = semis[matchIndex][1 - teamIndex];
        const isLeftWinnerSlot = isLeftSide ? 0 : 1;

        if (updated[midPoint][0]) {
          updated[midPoint][0][isLeftWinnerSlot] = teamName;
        }

        const isLeftLoserSlot = isLeftSide ? 0 : 1;
        if (updated[midPoint][1]) {
          updated[midPoint][1][isLeftLoserSlot] = opponentName;
        }

        return updated;
      }

      if (updated[nextCol] && updated[nextCol][nextMatchIndex]) {
        updated[nextCol][nextMatchIndex][nextSlot] = teamName;
      }
      return updated;
    });
  };

  const renderColumn = (colIndex) => (
    <div
      className="col d-flex flex-column justify-content-around"
      key={colIndex}
    >
      {bracket[colIndex]?.map((pair, idx) => (
        <table
          className="table table-bordered mb-2"
          key={idx}
          style={{ transition: "none" }}
        >
          <tbody>
            <tr
              onClick={() => handleSelectTeam(colIndex, idx, 0)}
              style={{ cursor: "pointer", height: "41px" }}
            >
              <td>{pair[0]}</td>
            </tr>
            <tr
              onClick={() => handleSelectTeam(colIndex, idx, 1)}
              style={{ cursor: "pointer", height: "41px" }}
            >
              <td>{pair[1]}</td>
            </tr>
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