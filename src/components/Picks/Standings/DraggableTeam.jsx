import React from "react";
import useDraggableTeam from "../../../hooks/Picks/Standings/useDraggableTeam";

const DraggableTeam = ({ team, index, groupIndex, moveTeam }) => {
  const { isDragging, drag, drop, isActive } = useDraggableTeam({
    index,
    groupIndex,
    moveTeam,
  });

  return (
    <button
      type="button"
      ref={(node) => drag(drop(node))}
      className={`list-group-item list-group-item-action d-flex p-2 ${
        isActive ? "bg-dark text-white" : ""
      }`}
      style={{ cursor: isDragging ? "grabbing" : "grab", transition: "0.2s" }}
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
      {team}
    </button>
  );
};

export default DraggableTeam;
