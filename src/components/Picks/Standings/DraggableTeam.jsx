import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableTeam = ({ team, index, groupIndex, moveTeam }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TEAM",
    item: { index, groupIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop, draggedGroup }, drop] = useDrop({
    accept: "TEAM",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      draggedGroup: monitor.getItem()?.groupIndex,
    }),
    hover: (draggedItem) => {
      if (
        draggedItem.index !== index &&
        draggedItem.groupIndex === groupIndex
      ) {
        moveTeam(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const isActive = isOver && canDrop && draggedGroup === groupIndex;

  return (
    <button
      type="button"
      ref={(node) => drag(drop(node))}
      className={`list-group-item list-group-item-action border d-flex p-2 ${
        isActive ? "bg-dark text-white" : ""
      }`}
      style={{ cursor: isDragging ? "grabbing" : "grab", transition: "0.2s" }}
    >
      <img
        src={`${import.meta.env.BASE_URL}flags/${team}.png`}
        alt={`${team.name} flag`}
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
