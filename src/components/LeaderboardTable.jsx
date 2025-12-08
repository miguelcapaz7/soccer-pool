import React from "react";

const LeaderboardTable = ({ leaders }) => {
  const columnHeaders = {
    placing: "#",
    name: "Name",
    step1pts: "Step 1",
    step2pts: "Step 2",
    step3pts: "Step 3",
    step4pts: "Step 4",
    total: "Total",
    winner: "Winner",
  };
  const columns = Object.keys(columnHeaders);

  return (
    <table className="table table-bordered mb-2 text-center">
      <thead className="table-light">
        <tr>
          {columns.map((col) => (
            <th key={col} scope="col">
              {columnHeaders[col]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {leaders.map((user) => (
          <tr key={user.id}>
            {columns.map((col) => (
              <td key={col}>{user[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
