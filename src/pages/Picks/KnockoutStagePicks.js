import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Step3 = () => {
  const navigate = useNavigate();

  // Read results from Step2 out of localStorage
  const step2Results = JSON.parse(localStorage.getItem("step2Results")) || [];

  const stages = [
    "Round of 32",
    "Round of 16",
    "Quarter Finals",
    "Semi Finals",
  ];

  const columnLabels = [
    ...stages,
    "Finals + 3rd Place",
    ...stages.slice().reverse(),
  ];

  // Helper to find group placing
  const getPlacing = (groupLetter, placing) => {
    const group = step2Results.find((g) => g.group === groupLetter);
    if (!group) return "";
    if (placing === 1) return group.first;
    if (placing === 2) return group.second;
    if (placing === 3) return group.third;
    return "";
  };

  // Build Round of 32
  const getInitialRoundOf32 = () => {
    return [
      [getPlacing("A", 2), getPlacing("B", 2)],
      [getPlacing("E", 1), getPlacing("A", 3)],
      [getPlacing("F", 1), getPlacing("C", 2)],
      [getPlacing("C", 1), getPlacing("F", 2)],
      [getPlacing("I", 1), getPlacing("C", 3)],
      [getPlacing("E", 2), getPlacing("I", 2)],
      [getPlacing("A", 1), getPlacing("E", 3)],
      [getPlacing("L", 1), getPlacing("H", 3)],
      [getPlacing("D", 1), getPlacing("B", 3)],
      [getPlacing("G", 1), getPlacing("J", 3)],
      [getPlacing("K", 2), getPlacing("L", 2)],
      [getPlacing("H", 1), getPlacing("J", 2)],
      [getPlacing("B", 1), getPlacing("G", 3)],
      [getPlacing("J", 1), getPlacing("H", 2)],
      [getPlacing("K", 1), getPlacing("D", 3)],
      [getPlacing("D", 2), getPlacing("G", 2)],
    ];
  };

  // Initialize bracket once
  const [bracket, setBracket] = useState(() => {
    const initial = [];
    const roundOf32 = getInitialRoundOf32();
    initial[0] = roundOf32.slice(0, 8);
    initial[1] = Array(4).fill(["", ""]);
    initial[2] = Array(2).fill(["", ""]);
    initial[3] = Array(1).fill(["", ""]);
    initial[4] = [["", ""], ["", ""]]; // Final + 3rd
    initial[5] = Array(1).fill(["", ""]);
    initial[6] = Array(2).fill(["", ""]);
    initial[7] = Array(4).fill(["", ""]);
    initial[8] = roundOf32.slice(8, 16);
    return initial;
  });

  const handleSelectTeam = (colIndex, matchIndex, teamIndex) => {
    const teamName = bracket[colIndex][matchIndex][teamIndex];
    if (!teamName) return;

    setBracket((prev) => {
      const updated = prev.map((col) => col.map((match) => [...match]));

      const totalCols = updated.length;
      const midPoint = Math.floor(totalCols / 2); // roughly where finals sit
      const isLeftSide = colIndex < midPoint; // left or right half?

      const nextCol = isLeftSide ? colIndex + 1 : colIndex - 1;
      const nextMatchIndex = Math.floor(matchIndex / 2);
      const nextSlot = matchIndex % 2 === 0 ? 0 : 1;

      // Stop if beyond Finals
      if (
        (isLeftSide && nextCol > midPoint) ||
        (!isLeftSide && nextCol < midPoint)
      ) {
        return updated;
      }

      // Handle Finals + 3rd place separately
      if (
        (isLeftSide && nextCol === midPoint) ||
        (!isLeftSide && nextCol === midPoint)
      ) {
        // === SEMIFINALS TO FINALS ===
        const semis = updated[colIndex];
        const opponentName = semis[matchIndex][1 - teamIndex];
        const isLeftWinnerSlot = isLeftSide ? 0 : 1;

        // Winner -> Finals
        if (updated[midPoint][0]) {
          updated[midPoint][0][isLeftWinnerSlot] = teamName;
        }

        // Loser -> 3rd place
        const isLeftLoserSlot = isLeftSide ? 0 : 1;
        if (updated[midPoint][1]) {
          updated[midPoint][1][isLeftLoserSlot] = opponentName;
        }

        return updated;
      }

      // Update the next column with selected team
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
        <table className="table table-bordered mb-2" key={idx}>
          <tbody>
            <tr
              onClick={() => handleSelectTeam(colIndex, idx, 0)}
              style={{ cursor: "pointer" }}
            >
              <td>{pair[0]}</td>
            </tr>
            <tr
              onClick={() => handleSelectTeam(colIndex, idx, 1)}
              style={{ cursor: "pointer" }}
            >
              <td>{pair[1]}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );

  return (
    <div className="container-fluid py-5 text-center mt-5">
      <h2 className="mb-4">
        STEP 3 - Complete the bracket with your predictions for the knockout
        stages
      </h2>
      <div className="row text-center fw-bold mb-3">
        {columnLabels.map((colLabel, idx) => (
          <div className="col" key={idx}>
            {colLabel}
          </div>
        ))}
      </div>
      <div className="row text-center d-flex">
        {columnLabels.map((_, colIndex) => renderColumn(colIndex))}
      </div>
      <Button onClick={() => navigate("/advancedTeamsPicks")} color="dark">Back</Button>
      <Button onClick={() => navigate("/topScorerPicks")} color="dark">Next</Button>
    </div>
  );
};

export default Step3;