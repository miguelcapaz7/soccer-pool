import React from "react";

const LeaderboardTable = ({ leaders, columnHeaders, columns }) => {
  return (
    <div className="table-responsive rounded-4 shadow-sm border">
      <table className="table align-middle text-center mb-0">
        <thead
          className="table-dark"
          style={{
            fontSize: "0.95rem",
            letterSpacing: "0.3px",
          }}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="py-2 border-0 fw-semibold"
                style={{ whiteSpace: "nowrap" }}
              >
                {columnHeaders[col]}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {leaders.map((user, rowIndex) => (
            <tr
              key={user.id}
              style={{
                backgroundColor:
                  rowIndex === 0
                    ? "#fff3cd"
                    : rowIndex === 1
                      ? "#f1f3f5"
                      : rowIndex === 2
                        ? "#f8e5d0"
                        : "transparent",
              }}
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className="py-2"
                  style={{
                    verticalAlign: "middle",
                    fontWeight:
                      col === "rank" || col === "totalPts"
                        ? "600"
                        : "400",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col === "rank" ? (
                    <span
                      className={`badge rounded-pill ${
                        user[col] === 1
                          ? "bg-warning text-dark"
                          : user[col] === 2
                            ? "bg-secondary"
                            : user[col] === 3
                              ? "bg-dark"
                              : "bg-light text-dark border"
                      } px-3 py-2`}
                    >
                      #{user[col]}
                    </span>
                  ) : (
                    user[col]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
