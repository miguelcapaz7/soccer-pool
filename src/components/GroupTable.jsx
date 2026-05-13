import React from "react";
import DraggableTeam from "./Picks/Standings/DraggableTeam.jsx";

const GroupTable = ({ group, groupIndex, moveTeam, draggable = false, rankings = false }) => (
  <div
    className="card shadow-sm h-100"
    style={{ backgroundColor: group.colour }}
  >
    <div className="card-header bg-dark text-white text-center py-2">
      <h5 className="mb-0">Group {group.group}</h5>
    </div>
    <div className="card-body text-center d-flex flex-column">
      <div className="list-group flex-grow-1">
        {group.teams.map((team, index) => {
          const key = team.id || `${groupIndex}-${index}`;
          return draggable ? (
            <div key={key} className="d-flex align-items-center">
              {/* ⭐ placing number */}
              <div
                className="fw-bold me-2"
                style={{
                  textAlign: "center",
                }}
              >
                {index + 1}
              </div>

              <div className="flex-grow-1">
                <DraggableTeam
                  team={team}
                  index={index}
                  groupIndex={groupIndex}
                  moveTeam={(fromIndex, toIndex) =>
                    moveTeam(groupIndex, fromIndex, toIndex)
                  }
                />
              </div>
            </div>
          ) : (
            <div
              key={key}
              className="d-flex justify-content-start p-2"
              style={{ cursor: "default" }}
            >
              <img
                src={`${import.meta.env.BASE_URL}flags/${team}.png`}
                alt={`${team} flag`}
                className="me-3 mx-2"
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "cover",
                  borderRadius: "2px",
                }}
              />
              <span>{team}</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default GroupTable;
