import React from "react";
import Button from "../../Button.jsx";
import GroupTable from "../../GroupTable.jsx";

const ReviewSection = ({ title, items, onEdit, step }) => {
  const renderContent = () => {
    if (!items || items.length === 0 || Object.keys(items).length === 0) {
      return <p className="text-danger">No data available.</p>;
    }

    if (step === 1) {
      return (
        <div className="row justify-content-between">
          {[1, 2, 3].map((md) => {
            const mdItems = items.filter((item) =>
              item.matchId.startsWith(`MD${md}`)
            );
            return (
              <div key={md} className="col-md-4">
                <div className="d-flex flex-column gap-2">
                  {mdItems.length > 0 ? (
                    mdItems.map(({ team1, team2, result }, idx) => (
                      <div
                        key={idx}
                        className={`border rounded p-1 ${
                          result.trim() === ""
                            ? "border-danger"
                            : "border-secondary"
                        }`}
                      >
                        <span>
                          {team1} vs {team2}:{" "}
                        </span>
                        <span className="fw-bold">{result}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No picks</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="row g-4">
          {items.standings.map((group, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <GroupTable
                group={{
                  group: group.group,
                  teams: group.topTwo,
                }}
                groupIndex={index}
                draggable={false}
              />
            </div>
          ))}

          <div className="col-12 mt-4">
            <h6 className="fw-bold">Third Place Teams:</h6>
            <p>{(items.thirdPlaceOrder || []).join(", ")}</p>
          </div>
        </div>
      );
    }

    if (step === 5) {
      const { totalGoals } = items;
      return (
        <div>
          <p>
            Total Goals Prediction: {totalGoals}
          </p>
        </div>
      );
    }

    if (Array.isArray(items)) {
      return (
        <ul className="list-group list-group-flush">
          {items.map((item, idx) => (
            <li key={idx} className="list-group-item">
              {typeof item === "string" ? item : JSON.stringify(item)}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header fw-bold d-flex justify-content-between align-items-center">
        {title}
        <Button color="secondary" onClick={onEdit}>
          Edit
        </Button>
      </div>
      <div className="card-body">{renderContent()}</div>
    </div>
  );
};

export default ReviewSection;
