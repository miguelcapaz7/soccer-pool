import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamsData } from '../data/teamsData';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../assets/styles/Step2.css';

const DraggableTeam = ({ team, index, moveTeam }) => {
  const [, ref] = useDrag({
    type: 'TEAM',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'TEAM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTeam(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li ref={(node) => ref(drop(node))} className="team">
      {team}
    </li>
  );
};

const Step2 = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState(teamsData);
  
  const handleNext = () => {
    navigate('/step3');
  };

  const moveTeam = (groupIndex, fromIndex, toIndex) => {
    const updatedGroups = [...groups];
    const group = updatedGroups[groupIndex];
    const teamList = [...group.teams];
    const [movedTeam] = teamList.splice(fromIndex, 1);
    teamList.splice(toIndex, 0, movedTeam);
    updatedGroups[groupIndex] = { ...group, teams: teamList };
    setGroups(updatedGroups);
  };

  const renderTeams = (groupData, groupIndex) => {
    return groupData.teams.map((team, index) => (
      <DraggableTeam
        key={index}
        team={team}
        index={index}
        moveTeam={(fromIndex, toIndex) => moveTeam(groupIndex, fromIndex, toIndex)}
      />
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="step2-container">
        <h1>STEP 2 - Predict the top 2 teams to advance from each group</h1>
        <p>
          2 points for every correct team selected. Bonus of 2 points if they
          are in the correct order of finishing 1st or 2nd in the group.
        </p>
        <div className="group-container">
          {groups.map((groupData, groupIndex) => (
            <div key={groupIndex} className="group-box">
              <h3>Group {groupData.group}</h3>
              <ul className="team-list">
                {renderTeams(groupData, groupIndex)}
              </ul>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="next-button">
          Next
        </button>
      </div>
    </DndProvider>
  );
};

export default Step2;