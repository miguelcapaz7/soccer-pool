import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import DraggableTeam from "./Picks/Standings/DraggableTeam";
import useIsMobile from "../hooks/useIsMobile"
import { getTeamLabel } from "../data/teamAbbreviations";

const GroupTable = ({
  group,
  groupIndex,
  moveTeam,
  draggable = false,
  rankings = false,
}) => {

  const isMobile = useIsMobile();
  const abbreviate = rankings && isMobile;

  const sensors = useSensors(
    // Desktop: a 5px movement threshold means clicks still register normally
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    // Touch: long-press 120ms before drag activates, so vertical scrolling
    // through the page still works when starting from a team row
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = group.teams.indexOf(active.id);
    const toIndex = group.teams.indexOf(over.id);
    if (fromIndex === -1 || toIndex === -1) return;

    moveTeam(groupIndex, fromIndex, toIndex);
  };

  const renderRow = (team, index, content) => (
    <div
      key={team.id || `${groupIndex}-${index}`}
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
      {content}
    </div>
  );

  return (
    <div
      className="card shadow-sm h-100 border-0"
      style={{ backgroundColor: group.colour }}
    >
      <div className="card-header bg-dark text-white text-center py-2 px-2">
        <h6 className="mb-0 fw-semibold">Group {group.group}</h6>
      </div>
      <div className="card-body p-2 d-flex flex-column">
        <div className="list-group list-group-flush flex-grow-1">
          {draggable ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={group.teams}
                strategy={verticalListSortingStrategy}
              >
                {group.teams.map((team, index) =>
                  renderRow(
                    team,
                    index,
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <DraggableTeam team={team}
                      label={getTeamLabel(team, abbreviate)}
                      />
                    </div>,
                  ),
                )}
              </SortableContext>
            </DndContext>
          ) : (
            group.teams.map((team, index) =>
              renderRow(
                team,
                index,
                <>
                  <img
                    src={`${import.meta.env.BASE_URL}flags/${team}.png`}
                    alt=""
                    style={{
                      width: 20,
                      height: 20,
                      objectFit: "cover",
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="small text-truncate"
                    title={team}
                    style={{ minWidth: 0 }}
                  >
                    {getTeamLabel(team, abbreviate)}
                  </span>
                </>,
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupTable;
