import MatchDayTable from "../../../../components/Picks/GroupStage/MatchDayTable";
import { useEffect, useState, useRef, useCallback } from "react";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { generateEmptyGroupStagePicks } from "../../../../utils/Picks/GroupStage/groupStageUtils";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const MarkGroupStage = ({ registerSave, markDirty, isSaving }) => {
  const [groupStagePicks, setGroupStagePicks] = useState(
    useRef(generateEmptyGroupStagePicks()).current,
  );
  const [loading, setLoading] = useState(true);
  const isDirtyRef = useRef(false);
  const dirtyMatchesRef = useRef(new Set());
  const picksRef = useRef(groupStagePicks);

  const [error, setError] = useState("");

  useEffect(() => {
    picksRef.current = groupStagePicks;
  }, [groupStagePicks]);

  useEffect(() => {
    const ref = doc(db, "master", "step1");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (!snapshot.exists()) {
          setLoading(false);
          return;
        }
        const data = snapshot.data().step1Picks ?? {};

        if (!isDirtyRef.current) {
          setGroupStagePicks(data);
          picksRef.current = data;
        }

        setLoading(false);
      },
      (err) => {
        console.error("Error loading master picks:", err);
        setError("Failed to load master picks.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handlePick = useCallback((matchId, option) => {
    if (isSaving) return;

    isDirtyRef.current = true;
    markDirty();

    setGroupStagePicks((prev) => {
      const currentResult = prev[matchId]?.result ?? "";
      const newResult = currentResult === option ? "" : option;

      dirtyMatchesRef.current.add(matchId);

      return {
        ...prev,
        [matchId]: { result: newResult },
      };
    });
  }, [isSaving, markDirty]);

  useEffect(() => {
    registerSave(async () => {
      const ref = doc(db, "master", "step1");

      const updates = {};
      dirtyMatchesRef.current.forEach((matchId) => {
        updates[`step1Picks.${matchId}`] = groupStagePicks[matchId];
      });

      if (Object.keys(updates).length === 0) return;

      try {
        await updateDoc(ref, updates);
      } catch (err) {
        if (err.code === "not-found") {
          await setDoc(ref, { step1Picks: groupStagePicks });
        } else {
          throw err;
        }
      }

      dirtyMatchesRef.current.clear();
      isDirtyRef.current = false;
    });
  }, [groupStagePicks, registerSave]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="row g-4">
      {[1, 2, 3].map((md) => (
        <div key={md} className="col-12 col-lg-4">
          <MatchDayTable
            matchDay={md}
            groupStagePicks={groupStagePicks}
            handlePick={handlePick}
          />
        </div>
      ))}
    </div>
  );
};

export default MarkGroupStage;
