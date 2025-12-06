import TeamsData from "../../../data/TeamsData.js";

export const generateInitialPlayerPicks = () => {
  const numPlayers = 3;
  return Array.from({ length: numPlayers }, () => ({ team: "", player: "" }));
};

export const getPlayerPickerFields = (
  pick,
  index,
  onTeamChange,
  onPlayerChange,
  takenPlayers
) => {
  const pickedTeamData = TeamsData.find((t) => t.team === pick.team);
  const playerOptions = pickedTeamData?.players || [];

  return [
    {
      label: "Select Team",
      value: pick.team,
      onChange: (e) => onTeamChange(index, e.target.value),
      options: TeamsData.map((t) => ({ value: t.team, disabled: false })),
    },
    {
      label: "Select Player",
      value: pick.player,
      onChange: (e) => onPlayerChange(index, e.target.value),
      options: playerOptions.map((player) => ({
        value: player,
        disabled: takenPlayers.has(player) && pick.player !== player
      })),
      disabled: !pick.team,
    },
  ];
};
