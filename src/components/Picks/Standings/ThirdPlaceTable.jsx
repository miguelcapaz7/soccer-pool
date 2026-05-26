import DraggableTeam from "./DraggableTeam.jsx";

const ThirdPlaceTable = ({ teams, selectedTeams, toggleTeam }) => (
  <div className="card shadow-sm">
    <div className="card-body text-center">
      <h4 className="card-title mb-2">Top 3rd Place Teams</h4>
      <p className="text-muted mb-2 small">
        Select the top 8 third place teams that will advance
      </p>

      <div className="row row-cols-2 g-2">
        {teams.map((teamObj, index) => {
          const isSelected = selectedTeams.some((t) => t.team === teamObj.team);
          return (
            <div className="col" key={index}>
              <button
                type="button"
                onClick={() => toggleTeam(teamObj)}
                className={`w-100 d-flex align-items-center gap-2 p-2 rounded border ${
                  isSelected
                    ? "bg-success text-white border-success"
                    : "bg-white"
                }`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}flags/${teamObj.team}.png`}
                  alt=""
                  style={{
                    width: "20px",
                    height: "20px",
                    objectFit: "cover",
                    borderRadius: "2px",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="small text-truncate text-start flex-grow-1"
                  title={teamObj.team}
                  style={{ minWidth: 0 }}
                >
                  {teamObj.team}
                </span>
                {isSelected && <i className="bi bi-check-circle-fill" />}
              </button>
            </div>
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
