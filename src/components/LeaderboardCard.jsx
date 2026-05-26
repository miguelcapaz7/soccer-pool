import { ROW_BG, totalBadgeClass } from "../utils/leaderboardUtils";

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

  return (
    <div className="rounded-3 border shadow-sm p-3 d-flex flex-column gap-2 bg-light">
      <div className="d-flex align-items-center gap-2">
        <div
          className="fs-3 fw-bold text-center"
          style={{ minWidth: "2.25rem" }}
        >
          {user.placing}
        </div>
        <div className="flex-grow-1 fw-semibold text-truncate">
          {user[primaryColumn]}
        </div>
        <span className={totalBadgeClass(user.total)}>{user.total}</span>
      </div>

      {detailColumns.length > 0 && (
        <div
          className="pt-2 border-top small"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            rowGap: "0.5rem",
            columnGap: "1rem",
          }}
        >
          {detailColumns.map((col) => (
            <div key={col}>
              <span className="text-muted">{columnHeaders[col]}: </span>
              <span className="fw-medium">{user[col]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderboardCard;