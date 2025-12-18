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

  useEffect(() => {
    const ref = doc(db, "master", "pool");

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;

      if (!isDirtyRef.current) {
        setGroupStagePicks(snap.data().step1Picks ?? {});
      }
      setLoading(false)
    });

    return unsub;
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
      await setDoc(ref, { groupStagePicks }, { merge: true });
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
