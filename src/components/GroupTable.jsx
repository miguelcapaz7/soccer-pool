import React from "react";
import DraggableTeam from "./Picks/Standings/DraggableTeam.jsx";

const GroupTable = ({ group, groupIndex, moveTeam, draggable = false }) => (
  <div
    className="card shadow-sm h-100"
    style={{ backgroundColor: group.colour }}
  >
    <div className="card-body text-center d-flex flex-column">
      <h5 className="card-title">Group {group.group}</h5>
      <div className="list-group flex-grow-1">
        {group.teams.map((team, index) => {
          const key = team.id || `${groupIndex}-${index}`;
          return draggable ? (
            <DraggableTeam
              key={key}
              team={team}
              index={index}
              groupIndex={groupIndex}
              moveTeam={(fromIndex, toIndex) =>
                moveTeam(groupIndex, fromIndex, toIndex)
              }
            />
          ) : (
            <div
              key={key}
              className="d-flex justify-content-start p-2"
              style={{ cursor: "default" }}
            >
              <img
                src={`${import.meta.env.BASE_URL}public/flags/${team}.png`}
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
