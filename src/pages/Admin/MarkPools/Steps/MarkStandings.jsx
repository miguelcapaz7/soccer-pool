import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GroupTable from "../../../../components/GroupTable";
import ThirdPlaceTable from "../../../../components/Picks/Standings/ThirdPlaceTable";
import useMarkStandings from "../../../../hooks/Admin/MarkPools/useMarkStandings";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const MarkStandings = ({ registerSave, markDirty, isSaving }) => {
  const {
    standings,
    thirdPlaceTeams,
    selectedThirdPlaceTeams,
    moveTeam,
    toggleThirdPlaceTeam,
    loading,
  } = useMarkStandings({ registerSave, markDirty, isSaving });

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {/* Groups Grid */}
      <div className="row g-2 g-md-3">
        {standings.map((group, index) => (
          <div
            className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"
            key={group.group}
          >
            <GroupTable
              group={group}
              groupIndex={index}
              moveTeam={moveTeam}
              draggable={true}
              rankings={true}
            />
          </div>
        ))}
      </div>

      {/* Third-place ranking */}
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-8 col-lg-6">
          <ThirdPlaceTable
            teams={thirdPlaceTeams}
            selectedTeams={selectedThirdPlaceTeams}
            toggleTeam={toggleThirdPlaceTeam}
          />
        </div>
      </div>
    </>
  );
};

export default MarkStandings;
