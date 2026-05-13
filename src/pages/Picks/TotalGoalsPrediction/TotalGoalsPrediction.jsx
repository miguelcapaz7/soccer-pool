import React from "react";
import useTotalGoalsPrediction from "../../../hooks/Picks/TotalGoalsPrediction/useTotalGoalsPrediction";

const TotalGoalsPrediction = ({ user }) => {
  const { goalPrediction, goalPredictionError, handleGoalInput } =
    useTotalGoalsPrediction(user);

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <label htmlFor="goalPrediction" className="form-label fw-bold">
        Enter your prediction:
      </label>
      <input
        id="goalPrediction"
        type="text"
        className="form-control w-25 text-center"
        placeholder="e.g. 145"
        value={goalPrediction}
        onChange={(e) => handleGoalInput(e.target.value)}
      />
      {goalPredictionError && (
        <div className="text-danger mt-2">{goalPredictionError}</div>
      )}
    </div>
  );
};

export default TotalGoalsPrediction;
