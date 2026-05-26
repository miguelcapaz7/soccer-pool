import React from "react";
import { ROW_BG, totalBadgeClass, PLACING_BADGE_CLASS } from "../utils/leaderboardUtils";
import LeaderboardCard from "./LeaderboardCard";

const LeaderboardTable = ({
  leaders,
  columnHeaders,
  columns,
  primaryColumn = "name",
}) => {
  return (
    <>
      <div className="d-none d-md-block table-responsive rounded-4 shadow-sm border">
        <table className="table align-middle text-center mb-0">
          <thead
            className="table-dark"
            style={{ fontSize: "0.95rem", letterSpacing: "0.3px" }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="py-2 border-0 fw-semibold text-nowrap"
                >
                  {columnHeaders[col]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaders.map((user, rowIndex) => (
              <tr key={user.id}>
                {columns.map((col) => {
                  const isTotal = col === "total";
                  const isRank = col === "placing"
                  const emphasized = isTotal || col === "placing";
                  return (
                    <td
                      key={col}
                      className={`py-2 text-nowrap ${emphasized ? "fw-semibold" : ""}`}
                    >
                      {isTotal ? (
                        <span className={totalBadgeClass(user[col])}>
                          {user[col]}
                        </span>
                      ) : (
                        user[col]
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-md-none d-flex flex-column gap-2">
        {leaders.map((user, rowIndex) => (
          <LeaderboardCard
            key={user.id}
            user={user}
            rowIndex={rowIndex}
            columnHeaders={columnHeaders}
            columns={columns}
            primaryColumn={primaryColumn}
          />
        ))}
      </div>
    </>
  );
};

export default LeaderboardTable;
