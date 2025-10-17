import React from "react";

const LeaderboardTable = ({ leaders }) => (
  <table className="table table-bordered mb-2 text-center">
    <thead className="table-light">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Step 1 Pts</th>
        <th scope="col">Step 2 Pts</th>
        <th scope="col">Step 3 Pts</th>
        <th scope="col">Step 4 Pts</th>
        <th scope="col">Total</th>
        <th scope="col">Winner</th>
      </tr>
    </thead>
    <tbody>
      {leaders.map(user => (
        <tr key={user.id}>
          <td>{user.placing}</td>
          <td>{user.name}</td>
          <td>{user.step1pts}</td>
          <td>{user.step2pts}</td>
          <td>{user.step3pts}</td>
          <td>{user.step4pts}</td>
          <td>{user.total}</td>
          <td>{user.winner}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default LeaderboardTable;
