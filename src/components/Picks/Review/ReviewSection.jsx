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
            return (
              <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
                <GroupTable
                  group={group}
                  groupIndex={index}
                  draggable={false}
                  rankings={true}
                />
              </div>
            );
          })}

          <div className="col-12 mt-4">
            <h6 className="fw-bold">Advancing Third Place Teams:</h6>

            <div className="row g-2">
              {(items.thirdPlaceOrder.slice(0, 8) || []).map((t, index) => (
                <div
                  key={index}
                  className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl"
                >
                  <div className="card text-center shadow-sm h-100">
                    <div className="card-body p-2 d-flex flex-column align-items-center justify-content-center">
                      <img
                        src={`${import.meta.env.BASE_URL}flags/${t.team}.png`}
                        alt={`${t.team} flag`}
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "cover",
                          borderRadius: "2px",
                        }}
                      />
                      <small>{t.team}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
