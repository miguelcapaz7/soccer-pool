import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teamsData } from "../data/teamsData";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
      if (draggedItem.index !== index && draggedItem.groupIndex === groupIndex) {
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

const Step2 = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState(teamsData);

  const handleNext = () => {
    const results = groups.map(group => ({
      group: group.group,
      first: group.teams[0],
      second: group.teams[1],
      third: group.teams[2],
    }));
    localStorage.setItem("step2Results", JSON.stringify(results));
    navigate("/step3");
  };

  const rows = [];
  for (let i = 0; i < groups.length; i += 4) {
    rows.push(groups.slice(i, i + 4));
  }

  const moveTeam = (groupIndex, fromIndex, toIndex) => {
    setGroups((prev) => {
      const updatedGroups = [...prev];
      const group = updatedGroups[groupIndex];
      const teamList = [...group.teams];
      const [movedTeam] = teamList.splice(fromIndex, 1);
      teamList.splice(toIndex, 0, movedTeam);
      updatedGroups[groupIndex] = { ...group, teams: teamList };
      return updatedGroups;
    });
  };

  const renderTeams = (groupData, groupIndex) =>
    groupData.teams.map((team, index) => (
      <DraggableTeam
        key={team.id || `${groupIndex}-${index}`}
        team={team}
        index={index}
        groupIndex={groupIndex}
        moveTeam={(fromIndex, toIndex) =>
          moveTeam(groupIndex, fromIndex, toIndex)
        }
      />
    ));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container py-5 text-center">
        <h1>STEP 2 - Predict the top 2 teams to advance from each group</h1>
        <p>
          2 pts for every correct team selected. Bonus of 2 points if they
          are in the correct order of finishing 1st or 2nd in the group.
        </p>
        {rows.map((row, rowIndex) => (
          <div className="row mb-4" key={rowIndex}>
            {row.map((group, colIndex) => {
              const groupIndex = rowIndex * 4 + colIndex;
              return (
                <div className="col" key={colIndex}>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        Group {group.group}
                      </h5>
                      <div className="list-group">
                        {renderTeams(group, groupIndex)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <button onClick={handleNext} className="btn btn-dark">
          Next
        </button>
      </div>
    </DndProvider>
  );
};

export default Step2;
