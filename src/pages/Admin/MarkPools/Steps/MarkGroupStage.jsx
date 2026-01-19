import MatchDayTable from "../../../../components/Picks/GroupStage/MatchDayTable";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { generateEmptyGroupStagePicks } from "../../../../utils/Picks/GroupStage/groupStageUtils";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const MarkGroupStage = ({ registerSave, markDirty, isSaving }) => {
  const [groupStagePicks, setGroupStagePicks] = useState(
    useRef(generateEmptyGroupStagePicks()).current
  );
  const [loading, setLoading] = useState(true);
  const isDirtyRef = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const ref = doc(db, "master", "pool");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (!snapshot.exists()) {
          setLoading(false);
          return;
        }

        // Only hydrate from DB if user has not started editing
        if (!isDirtyRef.current) {
          setGroupStagePicks(snapshot.data().step1Picks ?? {});
        }

        setLoading(false);
      },
      (err) => {
        console.error("Error loading master picks:", err);
        setError("Failed to load master picks.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handlePick = (matchId, option) => {
    if (isSaving) return;

    isDirtyRef.current = true;
    markDirty();
    setGroupStagePicks((prev) => {
      const currentResult = prev[matchId]?.result ?? "";

      return {
        ...prev,
        [matchId]: {
          result: currentResult === option ? "" : option,
        },
      };
    });
  };

  useEffect(() => {
    registerSave(async () => {
      const ref = doc(db, "master", "pool");
      await setDoc(ref, { step1Picks: groupStagePicks }, { merge: true });
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
