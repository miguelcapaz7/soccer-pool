import PickButtons from "./PickButtons";

const MatchRow = ({
  matchId,
  group,
  home,
  away,
  currentPick,
  actualResult,
  clickable,
  needsAttention,
  onPick,
}) => {
  const options = [
    { value: home, label: home },
    { value: "Tie", label: "Tie" },
    { value: away, label: away },
  ];

  const isMarked = actualResult !== undefined && actualResult !== "";

  const isCorrect = isMarked && currentPick && currentPick === actualResult;

  const rowClass = needsAttention
    ? "bg-danger-subtle"
    : isMarked
      ? isCorrect
        ? "bg-success-subtle"
        : "bg-danger-subtle"
      : "";

  return (
    <div
      className={`d-flex align-items-center gap-2 p-2 border-bottom ${rowClass} ${
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
