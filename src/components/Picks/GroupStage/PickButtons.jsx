const PickButtons = ({ matchId, options, currentPick, clickable, onPick }) => (
  <div className="btn-group w-100" role="group" aria-label="Match pick">
    {options.map(({ value, label }) => {
      const selected = currentPick === value;
      const isTie = value === "Tie";
      return (
        <button
          key={value}
          type="button"
          disabled={!clickable}
          onClick={() => clickable && onPick(matchId, value)}
          className={`btn btn-md text-dark ${
            selected ? "btn-primary text-white" : "btn-outline-secondary"
          }`}
          style={{
            minHeight: "2.25rem",
            whiteSpace: "normal",
            flex: isTie ? "0 0 4rem" : "1 1 0",
          }}
        >
          {label}
        </button>
      );
    })}
  </div>
);

export default PickButtons;