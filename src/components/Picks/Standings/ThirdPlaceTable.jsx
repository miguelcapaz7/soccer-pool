import DraggableTeam from "./DraggableTeam.jsx";

const ThirdPlaceTable = ({ teams, moveTeam }) => (
  <div className="card shadow-sm">
    <div className="card-body text-center">
      <h4 className="card-title mb-3">Best 3rd-Place Ranking</h4>

      <div className="list-group">
        {teams.map((team, index) => (
          <DraggableTeam
            key={team.id || index}
            team={team}
            index={index}
            groupIndex={null}
            moveTeam={(fromIndex, toIndex) => moveTeam(fromIndex, toIndex)}
          />
        ))}
      </div>
    </div>
  </div>
);

export default ThirdPlaceTable;