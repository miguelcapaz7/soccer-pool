import { getPlayerPickerFields } from "../../../utils/Picks/TopScorers/topScorerUtils.js";

const PlayerPicker = ({ index, pick, onTeamChange, onPlayerChange, takenPlayers }) => {
  const fields = getPlayerPickerFields(
    pick,
    index,
    onTeamChange,
    onPlayerChange,
    takenPlayers
  );

  return (
    <div className="col mb-4">
      {fields.map((field, idx) => (
        <div className="text-center" key={idx}>
          <label className="form-label fw-bold">{field.label}:</label>
          <select
            className="form-select mx-auto"
            value={field.value}
            onChange={field.onChange}
            disabled={field.disabled}
            style={{width: "65%"}}
          >
            <option value="">-- {field.label} --</option>
            {field.options.map((opt, i) => (
              <option key={i} value={opt.value} disabled={opt.disabled}>
                {opt.value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default PlayerPicker;
