import { useState, useEffect, useRef } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import TotalGoalsBox from "../../../../components/Picks/TotalGoalsPredictions.jsx/TotalGoalsBox";
import useMarkTotalGoalsPrediction from "../../../../hooks/Admin/MarkPools/useMarkTotalGoalsPrediction";

const MarkTotalGoalsPrediction = ({ registerSave, markDirty, isSaving }) => {
  const { loading, goalPrediction, goalPredictionError, handleGoalInput } =
    useMarkTotalGoalsPrediction({ registerSave, markDirty, isSaving });

  if (loading) return <LoadingSpinner />;

  return (
    <TotalGoalsBox
      title="Enter Total Goals"
      prediction={goalPrediction}
      error={goalPredictionError}
      handler={handleGoalInput}
    />
  );
};

export default MarkTotalGoalsPrediction;
