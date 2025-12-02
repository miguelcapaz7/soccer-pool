import GroupsData from "../../../data/GroupsData.js"; 

export const getMatchId = (matchDay, group, matchIndex) => {
  return `MD${matchDay}-G${group}-${matchIndex + 1}`;
};

export const getGroupStageMatchups = (matchDay) => {
  switch (matchDay) {
    case 1: return [[0, 1], [2, 3]];
    case 2: return [[0, 2], [3, 1]];
    case 3: return [[3, 0], [1, 2]];
    default: return [];
  }
};

export const generateEmptyGroupStagePicks = () => {
  const emptyPicks = {};
  const matchDays = [1, 2, 3];

  matchDays.forEach((day) => {
    GroupsData.forEach((groupData) => {
      const matchups = getGroupStageMatchups(day);
      matchups.forEach(([i, j], matchIndex) => {
        const matchId = getMatchId(day, groupData.group, matchIndex);
        emptyPicks[matchId] = {
          teams: [groupData.teams[i], groupData.teams[j]],
          result: ""
        };
      });
    });
  });

  return emptyPicks;
};