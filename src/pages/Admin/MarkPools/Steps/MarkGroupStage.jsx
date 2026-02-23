import MatchDayTable from "../../../../components/Picks/GroupStage/MatchDayTable";
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
import { db } from "../../../../firebase";
import { generateEmptyGroupStagePicks } from "../../../../utils/Picks/GroupStage/groupStageUtils";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const MarkGroupStage = ({ registerSave, markDirty, isSaving }) => {
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

      // ⭐ read both collections in parallel
      const [userPicksSnap, usersSnap] = await Promise.all([
        getDocs(collection(db, "userPicks")),
        getDocs(collection(db, "users")),
      ]);

      // ⭐ build uid → name map
      const nameMap = new Map();

      usersSnap.forEach((u) => {
        const data = u.data();

        const first = data.firstName ?? "";
        const last = data.lastName ?? "";

        const fullName = `${first} ${last}`.trim() || "Unknown";

        nameMap.set(u.id, fullName);
      });

      const batch = writeBatch(db);

      userPicksSnap.forEach((userDoc) => {
        const userId = userDoc.id;
        const data = userDoc.data();

        const userStep1 = data.step1Picks || {};
        const name = nameMap.get(userId) || "Unknown";
        const champion = data?.step3Picks?.CHAMPION?.[0] || "";

        let pts = 0;

        Object.keys(masterPicks).forEach((matchId) => {
          if (userStep1[matchId]?.result === masterPicks[matchId]?.result) {
            pts += 3;
          }
        });

        const lbRef = doc(db, "leaderboard", userId);

        batch.set(
          lbRef,
          {
            name,
            step1pts: pts,
            total: pts,
            winner: champion,
          },
          { merge: true },
        );
      });

      await batch.commit();

      dirtyMatchesRef.current.clear();
      isDirtyRef.current = false;
    });
  }, [registerSave]);

  if (loading) return <LoadingSpinner />;

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
