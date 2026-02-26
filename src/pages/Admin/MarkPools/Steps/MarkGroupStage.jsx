import MatchDayTable from "../../../../components/Picks/GroupStage/MatchDayTable";
import useMarkGroupStage from "../../../../hooks/Admin/MarkPools/useMarkGroupStage";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const MarkGroupStage = ({ registerSave, markDirty, isSaving }) => {
  const { groupStagePicks, handlePick, loading } = useMarkGroupStage({
    registerSave,
    markDirty,
    isSaving,
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="row g-4">
      {[1, 2, 3].map((md) => (
        <div key={md} className="col-12 col-lg-4">
          <MatchDayTable
            matchDay={md}
            groupStagePicks={groupStagePicks}
            handlePick={handlePick}
          />
        </div>
      ))}
    </div>
  );
};

export default MarkGroupStage;
