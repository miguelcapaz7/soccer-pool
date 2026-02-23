import { useState, useEffect, useRef } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const MarkTotalGoalsPrediction = ({ registerSave, markDirty, isSaving }) => {
  const [goalPrediction, setGoalPrediction] = useState("");
  const [goalPredictionError, setGoalPredictionError] = useState("");
  const [loading, setLoading] = useState(true);

  const isDirtyRef = useRef(false);

  // ⭐ load from firestore
  useEffect(() => {
    const ref = doc(db, "master", "step5");

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        setLoading(false);
        return;
      }

      if (!isDirtyRef.current) {
        const step5 = snap.data().step5Picks ?? {};
        setGoalPrediction(step5.totalGoals ?? "");
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  // ⭐ input handler with validation
  const handleGoalInput = (value) => {
    if (isSaving) return;

    if (!/^\d*$/.test(value)) {
      setGoalPredictionError("Only numbers allowed");
      return;
    }

    setGoalPredictionError("");
    setGoalPrediction(value);

    isDirtyRef.current = true;
    markDirty();
  };

  // ⭐ save
  useEffect(() => {
    registerSave(async () => {
      const ref = doc(db, "master", "step5");

      await setDoc(
        ref,
        {
          step5Picks: {
            totalGoals: Number(goalPrediction || 0),
          },
        },
        { merge: true }
      );

      isDirtyRef.current = false;
    });
  }, [goalPrediction, registerSave]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <label htmlFor="goalPrediction" className="form-label fw-bold">
        Enter total goals:
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

export default MarkTotalGoalsPrediction;