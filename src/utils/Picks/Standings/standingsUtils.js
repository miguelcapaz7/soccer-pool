import { GroupsData } from "../../../data/GroupsData"; 

export const generateInitialStandings = () => {
  return GroupsData.map(({ group, teams }) => ({
    group,
    teams,
  }));
};