import React from "react";
import useTotalGoalsPrediction from "../../../hooks/Picks/TotalGoalsPrediction/useTotalGoalsPrediction";
import TotalGoalsBox from "../../../components/Picks/TotalGoalsPredictions.jsx/TotalGoalsBox";

const TotalGoalsPrediction = ({ user }) => {
  const { goalPrediction, goalPredictionError, handleGoalInput } =
    useTotalGoalsPrediction(user);

  return (
    <TotalGoalsBox title="Your Prediction" prediction={goalPrediction} error={goalPredictionError} handler={handleGoalInput}/>
  );
};

export default TotalGoalsPrediction;
