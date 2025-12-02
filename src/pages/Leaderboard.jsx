import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import useLeaderboard from "../hooks/useLeaderboard.js";
import LeaderboardTable from "../components/LeaderboardTable.jsx";

const Leaderboard = () => {
  const { leaders, error } = useLeaderboard();

  return (
    <MainLayout title="Leaderboard">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <LeaderboardTable leaders={leaders} />
    </MainLayout>
  );
};

export default Leaderboard;