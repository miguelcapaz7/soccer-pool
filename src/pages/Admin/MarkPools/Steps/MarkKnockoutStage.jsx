import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import Bracket from "../../../../components/Picks/KnockoutStage/Bracket"
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

  useEffect(() => {
    const ref = doc(db, "master", "step2");

    const unsub = onSnapshot(ref, (snap) => {
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
  }, []);

  const roundOf32 = useMemo(
    () => (step2Results ? generateRoundOf32(step2Results) : []),
    [step2Results],
  );

  const validTeams = useMemo(
    () => new Set(roundOf32.flat().filter(Boolean)),
    [roundOf32],
  );

  useEffect(() => {
    if (!step2Results) return;

    const ref = doc(db, "master", "step3");

    const unsub = onSnapshot(ref, (snap) => {
      const base = updateBracketWithR32(
        generateEmptyTeamsMap(),
        roundOf32,
        validTeams,
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
  }, [step2Results, roundOf32, validTeams]);

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
    [markDirty, isSaving],
  );

  const handleSelectTeam = useCallback(
    (matchId, colIndex, matchupIndex, teamIndex) => {
      if (isSaving) return;

      const teamName = teamsByMatchId[matchId]?.[teamIndex];
      if (!teamName) return;

      isDirtyRef.current = true;
      markDirty();

      const totalCols = 9;
      const midPoint = Math.floor(totalCols / 2);
      const isLeftSide = colIndex < midPoint;
      const nextCol = isLeftSide ? colIndex + 1 : colIndex - 1;
      const nextMatchup = Math.floor(matchupIndex / 2);
      const nextSlot = matchupIndex % 2 === 0 ? 0 : 1;

      setTeamsByMatchId((prev) => {
        const updated = { ...prev };

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

        const nextMatch = Object.entries(generateBracketMap).find(
          ([, meta]) =>
            meta.colIndex === nextCol && meta.matchupIndex === nextMatchup,
        );

        if (nextMatch) {
          const [nextMatchId] = nextMatch;
          updated[nextMatchId] = updated[nextMatchId] || ["", ""];
          updated[nextMatchId][nextSlot] = teamName;
        }

        return updated;
      });
    },
    [teamsByMatchId, markDirty, isSaving],
  );

  useEffect(() => {
    registerSave(async () => {
      const ref = doc(db, "master", "step3");

      await setDoc(ref, { step3Picks: teamsByMatchId }, { merge: true });

      isDirtyRef.current = false;
    });
  }, [teamsByMatchId, registerSave]);

  const bracketColumns = useMemo(
    () => convertTeamsToColumns(teamsByMatchId),
    [teamsByMatchId],
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
