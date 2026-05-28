import { useState, useEffect, useRef } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const useMarkTotalGoalsPrediction = ({ registerSave, markDirty, isSaving }) => {
  const [goalPrediction, setGoalPrediction] = useState("");
  const [goalPredictionError, setGoalPredictionError] = useState("");
  const [loading, setLoading] = useState(true);

  const isDirtyRef = useRef(false);
  const lastSnapshotRef = useRef(null);

  // ⭐ realtime optimized listener
  useEffect(() => {
    const ref = doc(db, "master", "step5");

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        setLoading(false);
        return;
      }

      const step5 = snap.data().step5Picks ?? {};
      const value = String(step5.totalGoals ?? "");

      // ⭐ snapshot diff guard
      if (value === lastSnapshotRef.current) {
        setLoading(false);
        return;
      }

      lastSnapshotRef.current = value;

      if (!isDirtyRef.current) {
        setGoalPrediction(value);
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  // ⭐ input handler
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

  // ⭐ optimized save
  useEffect(() => {
    registerSave(async () => {
      if (!isDirtyRef.current) return;

      const numeric = Number(goalPrediction || 0);

      // ⭐ skip write if identical to snapshot
      if (numeric === Number(lastSnapshotRef.current ?? 0)) {
        isDirtyRef.current = false;
        return;
      }

      await setDoc(
        doc(db, "master", "step5"),
        { step5Picks: { totalGoals: numeric } },
        { merge: true },
      );

      lastSnapshotRef.current = String(numeric);
      isDirtyRef.current = false;
    });
  }, [goalPrediction, registerSave]);

  return { loading, goalPrediction, goalPredictionError, handleGoalInput };
};

export default useMarkTotalGoalsPrediction;
