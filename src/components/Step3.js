import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Results from Step 2
  const step2Results = location.state?.groups || []; 
  
  const stages = [
    "Round of 32",
    "Round of 16",
    "Quarter Finals",
    "Semi Finals"
  ];

  const columnLabels = [
    ...stages,
    "Finals + 3rd Place",
    ...stages.slice().reverse()
  ];

  // Helper to find group placing
  const getPlacing = (groupLetter, placing) => {
    const group = step2Results.find(g => g.group === groupLetter);
    if (!group) return "";
    if (placing === 1) return group.teams[0];
    if (placing === 2) return group.teams[1];
    if (placing === 3) return group.teams[2];
    return "";
  };

  // Build Round of 32 based on your rules
  const getInitialRoundOf32 = () => {
    return [
      // Group A runners-up v Group B runners-up
      [getPlacing("A", 2), getPlacing("B", 2)],
      // Group E winners v Group A/B/C/D/F third place
      [getPlacing("E", 1), getPlacing("A", 3)],
      // Group F winners v Group C runners-up
      [getPlacing("F", 1), getPlacing("C", 2)],
      // Group C winners v Group F runners-up
      [getPlacing("C", 1), getPlacing("F", 2)],
      // Group I winners v Group C/D/F/G/H third place
      [getPlacing("I", 1), getPlacing("C", 3)],
      // Group E runners-up v Group I runners-up
      [getPlacing("E", 2), getPlacing("I", 2)],
      // Group A winners v Group C/E/F/H/I third place
      [getPlacing("A", 1), getPlacing("E", 3)],
      // Group L winners v Group E/H/I/J/K third place
      [getPlacing("L", 1), getPlacing("H", 3)],
      // Group D winners v Group B/E/F/I/J third place
      [getPlacing("D", 1), getPlacing("B", 3)],
      // Group G winners v Group A/E/H/I/J third place
      [getPlacing("G", 1), getPlacing("J", 3)],
      // Group K runners-up v Group L runners-up
      [getPlacing("K", 2), getPlacing("L", 2)],
      // Group H winners v Group J runners-up
      [getPlacing("H", 1), getPlacing("J", 2)],
      // Group B winners v Group E/F/G/I/J third place
      [getPlacing("B", 1), getPlacing("G", 3)],
      // Group J winners v Group H runners-up
      [getPlacing("J", 1), getPlacing("H", 2)],
      // Group K winners v Group D/E/I/J/L third place
      [getPlacing("K", 1), getPlacing("D", 3)],
      // Group D runners-up v Group G runners-up
      [getPlacing("D", 2), getPlacing("G", 2)]
    ];
  };

  // Bracket state: array of columns, each column is an array of [team1, team2]
  const [bracket, setBracket] = useState([]);

  useEffect(() => {
    const initialBracket = [];
    initialBracket[0] = getInitialRoundOf32();
    initialBracket[1] = Array(8).fill(["", ""]);
    initialBracket[2] = Array(4).fill(["", ""]);
    initialBracket[3] = Array(2).fill(["", ""]);
    initialBracket[4] = [["", ""], ["", ""]]; // Finals + 3rd place
    initialBracket[5] = Array(2).fill(["", ""]);
    initialBracket[6] = Array(4).fill(["", ""]);
    initialBracket[7] = Array(8).fill(["", ""]);
    initialBracket[8] = Array(16).fill(["", ""]); // Reverse mirror

    setBracket(initialBracket);
  }, [step2Results]);

  const handleSelectTeam = (colIndex, matchIndex, teamIndex) => {
    const teamName = bracket[colIndex][matchIndex][teamIndex];
    if (!teamName) return;

    const nextCol = colIndex + 1;
    const nextMatchIndex = Math.floor(matchIndex / 2);
    const nextSlot = matchIndex % 2 === 0 ? 0 : 1;

    setBracket(prev => {
      const updated = prev.map(col => col.map(match => [...match]));
      updated[nextCol][nextMatchIndex][nextSlot] = teamName;
      return updated;
    });
  };

  const renderColumn = (colIndex) => (
    <div className="col d-flex flex-column justify-content-around" key={colIndex}>
      {bracket[colIndex]?.map((pair, idx) => (
        <table
          className="table table-bordered mb-2"
          key={idx}
        >
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
    <div className="container-fluid py-5 text-center">
      <h2 className="mb-4">
        STEP 3 - Complete the bracket with your predictions for the knockout stages
      </h2>
      <div className="row text-center fw-bold mb-3">
        {columnLabels.map((colLabel, idx) => (
          <div className="col" key={idx}>{colLabel}</div>
        ))}
      </div>
      <div className="row text-center d-flex">
        {columnLabels.map((_, colIndex) => renderColumn(colIndex))}
      </div>
      <button
        onClick={() => navigate("/step4", { state: { bracket } })}
        className="btn btn-primary mt-3"
      >
        Next
      </button>
    </div>
  );
};

export default Step3;

