import React from "react";

const LeaderboardTable = ({ leaders, columnHeaders, columns }) => {
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
