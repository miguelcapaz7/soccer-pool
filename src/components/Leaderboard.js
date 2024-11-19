import React from 'react';
import '../assets/styles/Leaderboard.css';

const Leaderboard = () => {
  return (
    <div>
        <div className="leaderboard-container">
          <h2>Leaderboard</h2>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Step 1 Pts</th>
                <th>Step 2 Pts</th>
                <th>Step 3 Pts</th>
                <th>Step 4 Pts</th>
                <th>Total</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {/* Rows will go here */}
            </tbody>
          </table>
      </div>
    </div>
  )
};

export default Leaderboard;