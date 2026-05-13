import DraggableTeam from "./DraggableTeam.jsx";

const ThirdPlaceTable = ({ teams, selectedTeams, toggleTeam }) => (
  <div className="card shadow-sm">
    <div className="card-body text-center">
      <h4 className="card-title mb-2">Top 3rd Place Teams</h4>
      <p className="text-muted mb-2">Select the top 8 third place teams that will advance</p>

      <div className="list-group">
        {teams.map((teamObj, index) => {
          const isSelected = selectedTeams.some((t) => t.team === teamObj.team);

          return (
            <button
              key={index}
              type="button"
              onClick={() => toggleTeam(teamObj)}
              className={`list-group-item list-group-item-action d-flex align-items-center p-2 border-1 ${
                isSelected ? "bg-success text-white" : ""
              }`}
            >
              <img
                src={`${import.meta.env.BASE_URL}flags/${teamObj.team}.png`}
                alt={`${teamObj.team} flag`}
                className="me-3 mx-2"
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "cover",
                  borderRadius: "2px",
                }}
              />

              <span>{teamObj.team}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-muted small">
        Selected: {selectedTeams.length} / 8
      </div>
    </div>
  </div>
);

export default ThirdPlaceTable;
