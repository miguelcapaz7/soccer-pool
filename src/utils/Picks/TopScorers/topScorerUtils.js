import { TeamsData } from "../../../data/TeamsData";

export const generateInitialPlayerPicks = () => {
  const numPlayers = 3;
  return Array.from({ length: numPlayers }, () => ({ team: "", player: "" }));
};

export const getPlayerPickerFields = (
  selection,
  index,
  onTeamChange,
  onPlayerChange
) => {
  const selectedTeamData = TeamsData.find((t) => t.team === selection.team);

  return [
    {
      label: "Select Team",
      value: selection.team,
      onChange: (e) => onTeamChange(index, e.target.value),
      options: TeamsData.map((t) => t.team),
      disabled: false,
    },
    {
      label: "Select Player",
      value: selection.player,
      onChange: (e) => onPlayerChange(index, e.target.value),
      options: selectedTeamData?.players || [],
      disabled: !selection.team,
    },
  ];
};
