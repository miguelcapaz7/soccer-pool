import React from "react";
import DraggableTeam from "./Picks/Standings/DraggableTeam.jsx";

const GroupTable = ({
  group,
  groupIndex,
  moveTeam,
  draggable = false,
  rankings = false,
}) => (
  <div
    className="card shadow-sm h-100 border-0"
    style={{ backgroundColor: group.colour }}
  >
    <div className="card-header bg-dark text-white text-center py-2 px-2">
      <h6 className="mb-0 fw-semibold">Group {group.group}</h6>
    </div>
    <div className="card-body p-2 d-flex flex-column">
      <div className="list-group list-group-flush flex-grow-1">
        {group.teams.map((team, index) => {
          const key = team.id || `${groupIndex}-${index}`;
          return (
            <div
              key={key}
              className="d-flex align-items-center gap-2 py-1"
              style={{ minWidth: 0 }}
            >
              {rankings && (
                <div
                  className="fw-bold small text-muted"
                  style={{ minWidth: "1rem", textAlign: "center" }}
                >
                  {index + 1}
                </div>
              )}

              {draggable ? (
                <DraggableTeam
                  team={team}
                  index={index}
                  groupIndex={groupIndex}
                  moveTeam={(fromIndex, toIndex) =>
                    moveTeam(groupIndex, fromIndex, toIndex)
                  }
                  isLast={index === group.teams.length - 1}
                />
              ) : (
                <>
                  <img
                    src={`${import.meta.env.BASE_URL}flags/${team}.png`}
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
                    className="small text-truncate"
                    title={team}
                    style={{ minWidth: 0 }}
                  >
                    {team}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default GroupTable;
