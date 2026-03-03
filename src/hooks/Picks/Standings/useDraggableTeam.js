import { useDrag, useDrop } from "react-dnd";

const useDraggableTeam = ({ index, groupIndex, moveTeam }) => {
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

  return { isDragging, drag, drop, isActive }
};

export default useDraggableTeam;
