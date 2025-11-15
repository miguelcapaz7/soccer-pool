import React from "react";
import DraggableTeam from "./Picks/Standings/DraggableTeam";

const GroupTable = ({ group, groupIndex, moveTeam, draggable = false }) => (
  <div
    className="card shadow-sm h-100"
    style={{ backgroundColor: group.colour }}
  >
    <div className="card-body text-center d-flex flex-column">
      <h5 className="card-title mb-3">Group {group.group}</h5>

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
            <button
              type="button"
              key={key}
              className="list-group-item list-group-item-action border p-2"
              style={{ cursor: "default" }}
              disabled
            >
              {team.name || team}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export default GroupTable;
