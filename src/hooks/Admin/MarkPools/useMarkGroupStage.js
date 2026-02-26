import { useEffect, useState, useRef, useCallback } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { generateEmptyGroupStagePicks } from "../../../utils/Picks/GroupStage/groupStageUtils";

const useMarkGroupStage = ({ registerSave, markDirty, isSaving }) => {
  const [groupStagePicks, setGroupStagePicks] = useState(
    useRef(generateEmptyGroupStagePicks()).current,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isDirtyRef = useRef(false);
  const dirtyMatchesRef = useRef(new Set());
  const picksRef = useRef(groupStagePicks);

  useEffect(() => {
    picksRef.current = groupStagePicks;
  }, [groupStagePicks]);

  // ⭐ MASTER LISTENER
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

  // ⭐ HANDLE PICK
  const handlePick = useCallback(
    (matchId, option) => {
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
    },
    [isSaving, markDirty],
  );

  // ⭐ SAVE + LEADERBOARD CALC
  useEffect(() => {
    registerSave(async () => {
      const ref = doc(db, "master", "step1");

      const updates = {};
      dirtyMatchesRef.current.forEach((matchId) => {
        updates[`step1Picks.${matchId}`] = picksRef.current[matchId];
      });

      if (Object.keys(updates).length === 0) return;

      // ⭐ 1. SAVE MASTER
      try {
        await updateDoc(ref, updates);
      } catch (err) {
        if (err.code === "not-found") {
          await setDoc(ref, { step1Picks: picksRef.current });
        } else {
          throw err;
        }
      }

      // ⭐ 2. CALCULATE LEADERBOARD (NO CLOUD FUNCTIONS)
      const masterPicks = picksRef.current;

      const userPicksSnap = await getDocs(collection(db, "userPicks"));

      const batch = writeBatch(db);

      userPicksSnap.forEach((userDoc) => {
        const userId = userDoc.id;
        const data = userDoc.data();

        const userStep1 = data.step1Picks || {};

        let pts = 0;

        Object.keys(masterPicks).forEach((matchId) => {
          if (userStep1[matchId]?.result === masterPicks[matchId]?.result) {
            pts += 3;
          }
        });

        batch.set(
          doc(db, "leaderboard", userId),
          { step1pts: pts },
          { merge: true },
        );
      });

      await batch.commit();

      dirtyMatchesRef.current.clear();
      isDirtyRef.current = false;
    });
  }, [registerSave]);

  return { groupStagePicks, handlePick, loading, error };
};

export default useMarkGroupStage;
