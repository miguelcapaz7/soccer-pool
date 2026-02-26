import useMarkTopScorers from "../../../../hooks/Admin/MarkPools/useMarkTopScorers"
import LoadingSpinner from "../../../../components/LoadingSpinner";

const MarkTopScorers = ({ registerSave, markDirty, isSaving }) => {
  const { players, loading, increment, decrement } =
    useMarkTopScorers({ registerSave, markDirty, isSaving });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Player</th>
            <th className="text-center">Goals</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {players.map((p) => (
            <tr key={p.player}>
              <td>{p.player}</td>
              <td className="text-center fw-bold">{p.goals}</td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-danger me-2"
                  onClick={() => decrement(p.player)}
                >
                  -
                </button>

                <button
                  className="btn btn-sm btn-success"
                  onClick={() => increment(p.player)}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkTopScorers;
