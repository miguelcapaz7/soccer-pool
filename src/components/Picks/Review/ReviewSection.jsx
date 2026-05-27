import React from "react";
import Button from "../../Button.jsx";
import GroupTable from "../../GroupTable.jsx";
import MatchDayTable from "../GroupStage/MatchDayTable.jsx";
import Bracket from "../KnockoutStage/Bracket.jsx";
import { convertTeamsToColumns } from "../../../utils/Picks/KnockoutStage/knockoutStageUtils.js";

const ReviewSection = ({ title, items, onEdit, step }) => {
  const hasData =
    items &&
    (Array.isArray(items)
      ? items.length > 0
      : Object.keys(items).length > 0);

  const renderContent = () => {
    if (!hasData) {
      return (
        <div className="text-center py-4">
          <div className="text-muted mb-3">
            <i className="bi bi-exclamation-circle" style={{ fontSize: "2rem" }} />
          </div>
          <h6 className="fw-semibold mb-1">No picks made yet</h6>
          <p className="text-muted small mb-3">
            You haven't completed this step.
          </p>
          {onEdit && (
            <button className="btn btn-dark btn-sm" onClick={onEdit}>
              Go to Step {step}
            </button>
          )}
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="row g-3 g-md-4">
          {[1, 2, 3].map((md) => (
            <div key={md} className="col-12 col-lg-4">
              <MatchDayTable
                matchDay={md}
                groupStagePicks={items}
                clickable={false}
                review={true}
              />
            </div>
          ))}
        </div>
      );
    }

    if (step === 2) {
      return (
        <>
          <div className="row g-3 g-md-4">
            {items.standings.map((group, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3 col-xl-2">
                <GroupTable
                  group={group}
                  groupIndex={index}
                  draggable={false}
                  rankings={true}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-top">
  <div
    className="text-uppercase small fw-semibold text-muted mb-3"
    style={{ letterSpacing: "0.05em" }}
  >
    Advancing Third Place Teams
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
      gap: "0.5rem",
    }}
  >
    {(items.thirdPlaceOrder.slice(0, 8) || []).map((t, index) => (
      <div
        key={index}
        className="d-flex align-items-center gap-2 rounded-pill bg-light px-3 py-2 small"
      >
        {/* <span
          className="d-flex align-items-center justify-content-center rounded-circle bg-white fw-bold text-muted flex-shrink-0"
          style={{ width: "20px", height: "20px", fontSize: "0.7rem" }}
        >
          {index + 1}
        </span> */}
        <img
          src={`${import.meta.env.BASE_URL}flags/${t.team}.png`}
          alt=""
          style={{
            width: "20px",
            height: "20px",
            objectFit: "cover",
            borderRadius: "2px",
            flexShrink: 0,
          }}
        />
        <span className="small fw-semibold text-truncate">{t.team}</span>
      </div>
    ))}
  </div>
</div>
        </>
      );
    }

    if (step === 3) {
      const bracketFromSaved = convertTeamsToColumns(items);
      return (
        <div className="bracket-scroll-wrapper" style={{ margin: "-1rem" }}>
          <div className="p-3">
            <Bracket bracket={bracketFromSaved} readOnly={true} />
          </div>
        </div>
      );
    }

    if (step === 4) {
      const { totalGoals } = items;
      return (
        <div className="text-center py-3">
          <div
            className="text-uppercase small fw-semibold text-muted mb-2"
            style={{ letterSpacing: "0.05em" }}
          >
            Total Goals Prediction
          </div>
          <div className="fw-bold" style={{ fontSize: "3rem", lineHeight: 1 }}>
            {totalGoals}
          </div>
          <div className="text-muted small mt-2">goals across the tournament</div>
        </div>
      );
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-header bg-white border-bottom py-3 px-4">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3 min-w-0">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold flex-shrink-0"
              style={{ width: "32px", height: "32px", fontSize: "0.9rem" }}
            >
              {step}
            </div>
            <h6 className="fw-bold mb-0 text-truncate">{title}</h6>
          </div>
          {onEdit && hasData && (
            <button
              className="btn btn-sm btn-outline-dark flex-shrink-0"
              onClick={onEdit}
            >
              <i className="bi bi-pencil me-1" />
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="card-body p-3 p-md-4">{renderContent()}</div>
    </div>
  );
};

export default ReviewSection;
