import React from "react";
import Button from "../../Button.jsx";
import GroupTable from "../../GroupTable.jsx";
import MatchDayTable from "../GroupStage/MatchDayTable.jsx";
import Bracket from "../KnockoutStage/Bracket.jsx";
import { convertTeamsToColumns } from "../../../utils/Picks/KnockoutStage/knockoutStageUtils.js";

const ReviewSection = ({ title, items, onEdit, step }) => {
  const renderContent = () => {
    if (!items || items.length === 0 || Object.keys(items).length === 0) {
      return <p className="text-danger">No data available.</p>;
    }

    if (step === 1) {
      return (
        <div className="row justify-content-between">
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
        <div className="row g-4">
          {items.standings.map((group, index) => {
            const top2 = {
              ...group,
              teams: group.teams.slice(0, 2),
            };
            return (
              <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
                <GroupTable group={top2} groupIndex={index} draggable={false} />
              </div>
            );
          })}
          <div className="col-12 mt-4">
            <h6 className="fw-bold">Third Place Teams:</h6>
            <p>
              {(items.thirdPlaceOrder.slice(0, 8) || [])
                .map((t) => `${t.team}`)
                .join(", ")}
            </p>
          </div>
        </div>
      );
    }

    if (step === 3) {
      const bracketFromSaved = convertTeamsToColumns(items);
      return (
        <div className="bracket-scroll-wrapper">
          <Bracket bracket={bracketFromSaved} readOnly={true} />
        </div>
      );
    }

    if (step === 4) {
      const { totalGoals } = items;
      return (
        <div>
          <p>Total Goals Prediction: {totalGoals}</p>
        </div>
      );
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header fw-bold d-flex justify-content-between align-items-center">
        {title}
        {onEdit && (
          <Button color="secondary" onClick={onEdit}>
            Edit
          </Button>
        )}
      </div>
      <div className="card-body">{renderContent()}</div>
    </div>
  );
};

export default ReviewSection;
