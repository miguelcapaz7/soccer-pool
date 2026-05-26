import PickButtons from "./PickButtons";

const MatchRow = ({
  matchId,
  group,
  home,
  away,
  currentPick,
  clickable,
  needsAttention,
  onPick,
}) => {
  const options = [
    { value: home, label: home },
    { value: "Tie", label: "Tie" },
    { value: away, label: away },
  ];

  return (
    <div
      className={`d-flex align-items-center gap-2 p-2 border-bottom ${
        needsAttention ? "bg-danger-subtle" : ""
      }`}
    >
      <PickButtons
        matchId={matchId}
        options={options}
        currentPick={currentPick}
        clickable={clickable}
        onPick={onPick}
      />
    </div>
  );
};

export default MatchRow;