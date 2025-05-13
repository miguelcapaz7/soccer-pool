import React from "react";

const Leaderboard = () => {
  return (
    <div className="container py-4 text-center">
      <h2 className="text-center mb-4">Leaderboard</h2>
      <table className="table table-light table-bordered mb-2">
        <thead>
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
        <tbody>{/* Rows will go here */}</tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
