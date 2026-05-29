import { ROW_BG, totalBadgeClass, getPodiumStyle } from "../utils/leaderboardUtils";
import "../assets/styles/Leaderboard.css"

const LeaderboardCard = ({
  user,
  rowIndex,
  columnHeaders,
  columns,
  primaryColumn,
}) => {
  const detailColumns = columns.filter(
    (c) => c !== "placing" && c !== "total" && c !== primaryColumn,
  );

  const podium = getPodiumStyle(user.placing);
  const isTop7 = user.placing <= 7;

  return (
    <div
      className="card border-0 shadow-sm leaderboard-card"
      style={isTop7 ? { borderTop: `3px solid ${podium.accent}` } : {}}
    >
      <div className="card-body p-3 p-md-4">
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle fw-bold flex-shrink-0"
            style={{
              width: "44px",
              height: "44px",
              fontSize: "1.1rem",
              background: podium.bg,
              color: podium.color,
            }}
          >
            {user.placing}
          </div>

          <div className="flex-grow-1 min-w-0">
            <div className="fw-bold text-truncate" style={{ fontSize: "1rem" }}>
              {user[primaryColumn]}
            </div>
            {isTop7 && (
              <div
                className="text-uppercase fw-semibold"
                style={{
                  letterSpacing: "0.05em",
                  fontSize: "0.7rem",
                  color: podium.accent,
                }}
              >
                {podium.label}
              </div>
            )}
          </div>

          <div className="text-end flex-shrink-0">
            <div
              className="fw-bold"
              style={{ fontSize: "1.5rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
            >
              {user.total}
            </div>
            <div
              className="text-uppercase text-muted fw-semibold"
              style={{ fontSize: "0.65rem", letterSpacing: "0.05em" }}
            >
              pts
            </div>
          </div>
        </div>

        {detailColumns.length > 0 && (
          <div
            className="mt-3 pt-3 border-top"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "0.5rem 1rem",
            }}
          >
            {detailColumns.map((col) => (
              <div key={col} className="d-flex justify-content-between align-items-center small">
                <span className="text-muted">{columnHeaders[col]}:</span>
                <span className="fw-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {user[col]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardCard;