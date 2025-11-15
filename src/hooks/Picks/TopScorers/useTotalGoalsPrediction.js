import { useEffect, useState } from "react";

const getLocalStorageKey = (userId) => `totalGoalsPrediction_${userId}`;

const useTotalGoalsPrediction = (user) => {
  const [goalPrediction, setGoalPrediction] = useState("");
  const [error, setError] = useState("");

  const handleGoalInput = (value) => {
    if (value === "") {
      setGoalPrediction("");
      setError("");
      return;
    }
    
    if (!validate(value)) return;
    setGoalPrediction(value);

    if (user) {
      const localKey = getLocalStorageKey(user.uid);
      localStorage.setItem(localKey, JSON.stringify({ totalGoals: value }));
    }
  };

  const validate = (goalsInput) => {
    if (!/^\d+$/.test(goalsInput)) {
      setError("Please enter a valid number");
      return false;
    }

    setError("");
    return true;
  };

  useEffect(() => {
    if (!user) return;

    const localKey = getLocalStorageKey(user.uid);
    const localData = localStorage.getItem(localKey);

    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (parsed && typeof parsed.totalGoals === "string") {
          setGoalPrediction(parsed.totalGoals);
        }
      } catch (err) {
        console.error("Error loading total goals prediction:", err);
      } 
    }

  }, [user]);

  return {
    goalPrediction,
    error,
    handleGoalInput,
    validate,
  };
};

export default useTotalGoalsPrediction;