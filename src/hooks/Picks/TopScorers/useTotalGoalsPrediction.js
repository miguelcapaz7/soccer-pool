import { useEffect, useState, useMemo, useCallback } from "react";

const useTotalGoalsPrediction = (user) => {
  const [goalPrediction, setGoalPrediction] = useState("");
  const [goalPredictionError, setGoalPredictionError] = useState("");

  const localStorageKey = useMemo(
    () => (user ? `step5Picks_${user.uid}` : null),
    [user]
  );

  const saveToLocalStorage = useCallback((value) => {
    if (!user) return;
    localStorage.setItem(localStorageKey, JSON.stringify({ totalGoals: value }));
  }, [user, localStorageKey]);

  const validate = (value) => {
    if (value === "") {
      setGoalPredictionError("");
      return true;
    }

    if (!/^\d+$/.test(value)) {
      setGoalPredictionError("Please enter a valid number");
      return false;
    }

    setGoalPredictionError("");
    return true;
  };
  
  const handleGoalInput = useCallback((value) => {
    if (!validate(value)) return;
    setGoalPrediction(value);
    saveToLocalStorage(value)
  }, [validate, saveToLocalStorage]);

  useEffect(() => {
    if (!user) return;

    try {
      const savedData = localStorage.getItem(localStorageKey);
      if (!savedData) return;
      const parsed = JSON.parse(savedData);
      if (parsed && typeof parsed.totalGoals === "string") {
        setGoalPrediction(parsed.totalGoals);
      }
    } catch (err) {
      console.error("Error loading total goals prediction:", err);
    } 
  }, [user, localStorageKey]);

  return {
    goalPrediction,
    goalPredictionError,
    handleGoalInput,
    validate,
  };
};

export default useTotalGoalsPrediction;