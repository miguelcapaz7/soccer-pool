import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const useTotalGoalsPrediction = (user) => {
  const [goalPrediction, setGoalPrediction] = useState("");
  const [error, setError] = useState("");
  const savingTimer = useRef(null);

  const handleGoalInput = (value) => {
    if (/^\d*$/.test(value)) {
      setGoalPrediction(value);
      setError("");
      validate(value);
    } else {
      setError("Please enter a valid number");
    }
  };

  const validate = (currentGoals = goalPrediction) => {
    if (currentGoals === "" || isNaN(currentGoals)) {
      setError("Please enter a valid number");
      return false;
    }

    setError("");
    return true;
  };

  const scheduleSave = (newGoalPrediction) => {
    if (savingTimer.current) {
      clearTimeout(savingTimer.current);
    }

    savingTimer.current = setTimeout(async () => {
      if (!user) {
        console.warn("User not signed in — picks are not saved to Firestore.");
        return;
      }
      try {
        const ref = doc(db, "userPicks", user.uid);
        await setDoc(ref, { step5Picks: newGoalPrediction }, { merge: true });
      } catch (err) {
        console.error("Error saving step5 picks:", err);
      }
    }, 600);
  };

  useEffect(() => {
    const load = async () => {
      if (!user) {
        return;
      }
      try {
        const ref = doc(db, "userPicks", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          const savedPicks = data.step5Picks || {};
          // const emptyPicks = generateInitialPlayerPicks();
          // const merged = { ...emptyPicks, ...savedPicks };
          // setSelections(merged);
          // scheduleSave(merged)
        } 
      } catch (err) {
        console.error("Error loading step5 picks:", err);
      }
    };

    load();
  }, [user]);

  return {
    goalPrediction,
    error,
    handleGoalInput,
    validate,
  };
};

export default useTotalGoalsPrediction;