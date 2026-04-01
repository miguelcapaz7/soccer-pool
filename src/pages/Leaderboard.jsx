import MainLayout from "../layouts/MainLayout.jsx";
import useLeaderboard from "../hooks/useLeaderboard.js";
import LeaderboardTable from "../components/LeaderboardTable.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const Leaderboard = () => {
  const { leaders, loading, error, columnHeaders, columns } = useLeaderboard();

  return (
    <MainLayout title="Leaderboard">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : leaders.length === 0 ? (
        <div className="card mt-3">
          <div className="card-body text-center bg-light">
            <p className="card-title mb-0 text-muted">No data available</p>
          </div>
        </div>
      ) : (
        <LeaderboardTable leaders={leaders} columnHeaders={columnHeaders} columns={columns} />
      )}
    </MainLayout>
  );
};

export default Leaderboard;
