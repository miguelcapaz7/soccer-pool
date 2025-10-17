import React from "react";
import MainLayout from "../layouts/MainLayout";
import useLeaderboard from "../hooks/useLeaderboard";
import LeaderboardTable from "../components/LeaderboardTable";

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