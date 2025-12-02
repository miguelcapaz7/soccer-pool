import GroupsData from "../../../data/GroupsData.js"; 

export const generateInitialStandings = () => {
  return GroupsData.map(({ group, teams }) => ({
    group,
    teams
  }));
};