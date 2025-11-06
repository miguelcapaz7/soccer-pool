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
      className={`list-group-item list-group-item-action border p-2 ${
        isActive ? "bg-dark text-white" : ""
      }`}
      style={{ cursor: isDragging ? "grabbing" : "grab", transition: "0.2s" }}
    >
      {team}
    </button>
  );
};

export default DraggableTeam