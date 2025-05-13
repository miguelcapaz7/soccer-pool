import React from "react";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();
  
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
  ]

  const matchups = {
    0: Array.from({ length: 8 }, (_, i) => [`Team ${i * 2 + 1}`, `Team ${i * 2 + 2}`]),
    1: Array.from({ length: 4 }, (_, i) => [`Winner RO32 ${i * 2 + 1}`, `Winner RO32 ${i * 2 + 2}`]),
    2: Array.from({ length: 2 }, (_, i) => [`Winner RO16 ${i * 2 + 1}`, `Winner RO16 ${i * 2 + 2}`]),
    3: [[`Winner QF 1`, `Winner QF 2`]],
    4: [
      [`Winner SF 1`, `Winner SF 2`],
      [`Loser SF 1`, `Loser SF 2`]
    ],
    5: [[`Winner QF 3`, `Winner QF 4`]],
    6: Array.from({ length: 2 }, (_, i) => [`Winner RO16 ${i * 2 + 5}`, `Winner RO16 ${i * 2 + 6}`]),
    7: Array.from({ length: 4 }, (_, i) => [`Winner RO32 ${i * 2 + 9}`, `Winner RO32 ${i * 2 + 10}`]),
    8: Array.from({ length: 8 }, (_, i) => [`Team ${i * 2 + 17}`, `Team ${i * 2 + 18}`])
  };

  const renderColumn = (colIndex) => (
  <div className="col d-flex flex-column justify-content-around" key={colIndex}>
    {matchups[colIndex]?.map((pair, idx) => (
      <table className="table table-bordered mb-2" key={idx}>
        <tbody>
          <tr><td>{pair[0]}</td></tr>
          <tr><td>{pair[1]}</td></tr>
        </tbody>
      </table>
    ))}
    </div>
  );

  return (
    <div className="container-fluid py-4 text-center">
      <h2 className="mb-4">
        STEP 3 - Complete the bracket with your predictions for the knockout
        stages
      </h2>
      <div className="row text-center fw-bold mb-3">
        {columnLabels.map((colLabel, idx) => (
          <div className="col" key={idx}>{colLabel}</div>
        ))}
      </div>
      <div className="row text-center d-flex">
        {columnLabels.map((_, colIndex) => renderColumn(colIndex))}
      </div>
      <button onClick={() => navigate("/step4")} className="btn btn-primary">
        Next
      </button>
    </div>
  );
};

export default Step3;