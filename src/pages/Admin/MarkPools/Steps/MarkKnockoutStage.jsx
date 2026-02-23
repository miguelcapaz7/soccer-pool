import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import Bracket from "../../../../components/Picks/KnockoutStage/Bracket";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import {
  generateBracketMap,
  generateEmptyTeamsMap,
  generateRoundOf32,
  convertTeamsToColumns,
  updateBracketWithR32,
} from "../../../../utils/Picks/KnockoutStage/knockoutStageUtils";

const MarkKnockoutStage = ({ registerSave, markDirty, isSaving }) => {
  const [step2Results, setStep2Results] = useState(null);
  const [teamsByMatchId, setTeamsByMatchId] = useState(generateEmptyTeamsMap());
  const [loading, setLoading] = useState(true);

  const isDirtyRef = useRef(false);

  // ⭐ stable refs
  const step2Ref = useMemo(() => doc(db, "master", "step2"), []);
  const step3Ref = useMemo(() => doc(db, "master", "step3"), []);

  // ⭐ precompute bracket lookup map (huge optimization)
  const nextMatchLookup = useMemo(() => {
    const map = {};
    Object.entries(generateBracketMap).forEach(([id, meta]) => {
      map[`${meta.colIndex}-${meta.matchupIndex}`] = id;
    });
    return map;
  }, []);

  // ⭐ step2 listener
  useEffect(() => {
    const unsub = onSnapshot(step2Ref, (snap) => {
      if (!snap.exists()) {
        setLoading(false);
        return;
      }

      const data = snap.data();

      const groupTop2 = data.step2Picks.standings.map(({ group, teams }) => ({
        group,
        first: teams[0],
        second: teams[1],
      }));

      const thirdPlaceTop8 = data.step2Picks.thirdPlaceOrder.slice(0, 8);

      setStep2Results({ groups: groupTop2, thirdPlace: thirdPlaceTop8 });
      setLoading(false);
    });

    return unsub;
  }, [step2Ref]);

  const roundOf32 = useMemo(
    () => (step2Results ? generateRoundOf32(step2Results) : []),
    [step2Results]
  );

  const validTeams = useMemo(
    () => new Set(roundOf32.flat().filter(Boolean)),
    [roundOf32]
  );

  // ⭐ step3 listener
  useEffect(() => {
    if (!step2Results) return;

    const unsub = onSnapshot(step3Ref, (snap) => {
      const base = updateBracketWithR32(
        generateEmptyTeamsMap(),
        roundOf32,
        validTeams
      );

      if (!snap.exists()) {
        setTeamsByMatchId(base);
        return;
      }

      if (!isDirtyRef.current) {
        setTeamsByMatchId({ ...base, ...snap.data().step3Picks });
      }
    });

    return unsub;
  }, [step3Ref, step2Results, roundOf32, validTeams]);

  // ⭐ reset optimized
  const resetMatch = useCallback(
    (matchId) => {
      if (isSaving) return;

      isDirtyRef.current = true;
      markDirty();

      setTeamsByMatchId((prev) => {
        const updated = { ...prev };

        updated[matchId] =
          matchId === "CHAMPION" || matchId === "3rdWinner" ? [""] : ["", ""];

        Object.entries(generateBracketMap).forEach(([id, meta]) => {
          if (meta.dependsOn?.includes(matchId)) {
            updated[id] = ["", ""];
          }
        });

        return updated;
      });
    },
    [markDirty, isSaving]
  );

  // ⭐ select optimized (no stale closure)
  const handleSelectTeam = useCallback(
    (matchId, colIndex, matchupIndex, teamIndex) => {
      if (isSaving) return;

      setTeamsByMatchId((prev) => {
        const teamName = prev[matchId]?.[teamIndex];
        if (!teamName) return prev;

        isDirtyRef.current = true;
        markDirty();

        const updated = { ...prev };

        const totalCols = 9;
        const midPoint = Math.floor(totalCols / 2);
        const isLeftSide = colIndex < midPoint;
        const nextCol = isLeftSide ? colIndex + 1 : colIndex - 1;
        const nextMatchup = Math.floor(matchupIndex / 2);
        const nextSlot = matchupIndex % 2 === 0 ? 0 : 1;

        if (matchId === "F") {
          updated["CHAMPION"] = [teamName];
          return updated;
        }

        if (matchId.startsWith("SF")) {
          const opponent = prev[matchId][teamIndex === 0 ? 1 : 0];
          updated["F"] = updated["F"] || ["", ""];
          updated["3P"] = updated["3P"] || ["", ""];

          if (isLeftSide) {
            updated["F"][0] = teamName;
            updated["3P"][0] = opponent;
          } else {
            updated["F"][1] = teamName;
            updated["3P"][1] = opponent;
          }
          return updated;
        }

        if (matchId === "3P") {
          updated["3rdWinner"] = [teamName];
          return updated;
        }

        const nextMatchId = nextMatchLookup[`${nextCol}-${nextMatchup}`];
        if (nextMatchId) {
          updated[nextMatchId] = updated[nextMatchId] || ["", ""];
          updated[nextMatchId][nextSlot] = teamName;
        }

        return updated;
      });
    },
    [markDirty, isSaving, nextMatchLookup]
  );

  // ⭐ stable save handler
  const saveHandler = useCallback(async () => {
    await setDoc(step3Ref, { step3Picks: teamsByMatchId }, { merge: true });
    isDirtyRef.current = false;
  }, [teamsByMatchId, step3Ref]);

  useEffect(() => {
    registerSave(saveHandler);
  }, [registerSave, saveHandler]);

  const bracketColumns = useMemo(
    () => convertTeamsToColumns(teamsByMatchId),
    [teamsByMatchId]
  );

  if (loading) return <LoadingSpinner />;

  return (
    <Bracket
      bracket={bracketColumns}
      handleSelectTeam={handleSelectTeam}
      resetMatch={resetMatch}
    />
  );
};

export default MarkKnockoutStage;