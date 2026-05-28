import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableTeam = ({ team, label = team }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: team });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    touchAction: "none",
    cursor: isDragging ? "grabbing" : "grab",
    minWidth: 0,
  };

  return (
    <button
      type="button"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="list-group-item list-group-item-action d-flex align-items-center px-2 py-1 border-0 w-100"
    >
      <img
        src={`${import.meta.env.BASE_URL}flags/${team}.png`}
        alt=""
        className="me-2"
        style={{ width: 20, height: 20, borderRadius: 2, flexShrink: 0 }}
      />
      <span className="flex-grow-1 text-start text-truncate small" title={team}>{label}</span>
      <span
        aria-hidden="true"
        className="ms-1 d-flex flex-column"
        style={{ opacity: 0.6, flexShrink: 0 }}
      >
        <span
          style={{
            width: 12,
            height: 2,
            backgroundColor: "currentColor",
            marginBottom: 2,
          }}
        />
        <span
          style={{ width: 12, height: 2, backgroundColor: "currentColor" }}
        />
      </span>
    </button>
  );
};

export default DraggableTeam;
