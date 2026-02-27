import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  getDocs,
  collection,
  writeBatch,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase";
import {
  generateBracketMap,
  generateEmptyTeamsMap,
  generateRoundOf32,
  convertTeamsToColumns,
  updateBracketWithR32,
} from "../../../utils/Picks/KnockoutStage/knockoutStageUtils";

const useMarkKnockoutStage = ({ registerSave, markDirty, isSaving }) => {
  const [step2Results, setStep2Results] = useState(null);
  const [teamsByMatchId, setTeamsByMatchId] = useState(generateEmptyTeamsMap());
  const [loading, setLoading] = useState(true);

  const isDirtyRef = useRef(false);

  const step2Ref = useMemo(() => doc(db, "master", "step2"), []);
  const step3Ref = useMemo(() => doc(db, "master", "step3"), []);

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
    [step2Results],
  );

  const validTeams = useMemo(
    () => new Set(roundOf32.flat().filter(Boolean)),
    [roundOf32],
  );

  // ⭐ step3 listener
  useEffect(() => {
    if (!step2Results) return;

    const unsub = onSnapshot(step3Ref, (snap) => {
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
  }, [step3Ref, step2Results, roundOf32, validTeams]);

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
          if (meta.dependsOn?.includes(matchId)) updated[id] = ["", ""];
        });

        return updated;
      });
    },
    [markDirty, isSaving],
  );

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
    [markDirty, isSaving, nextMatchLookup],
  );

  const saveHandler = useCallback(async () => {
    await setDoc(step3Ref, { step3Picks: teamsByMatchId }, { merge: true });

    const extractRoundTeams = (picks, prefix) => {
      const teams = [];
      Object.entries(picks).forEach(([matchId, val]) => {
        if (matchId.startsWith(prefix))
          val.forEach((t) => t && teams.push(t));
      });
      return new Set(teams);
    };

    const masterR16 = extractRoundTeams(teamsByMatchId, "R16");
    const masterQF = extractRoundTeams(teamsByMatchId, "QF");
    const masterSF = extractRoundTeams(teamsByMatchId, "SF");
    const masterF = new Set(teamsByMatchId["F"]?.filter(Boolean) || []);
    const masterChampion = teamsByMatchId["CHAMPION"]?.[0];

    const userSnap = await getDocs(collection(db, "userPicks"));
    const batch = writeBatch(db);

    userSnap.forEach((userDoc) => {
      const uid = userDoc.id;
      const userPicks = userDoc.data()?.step3Picks || {};

      const userR16 = extractRoundTeams(userPicks, "R16");
      const userQF = extractRoundTeams(userPicks, "QF");
      const userSF = extractRoundTeams(userPicks, "SF");
      const userF = new Set(userPicks["F"]?.filter(Boolean) || []);
      const userChampion = userPicks["CHAMPION"]?.[0];

      let step3pts = 0;

      masterR16.forEach((t) => userR16.has(t) && (step3pts += 2));
      masterQF.forEach((t) => userQF.has(t) && (step3pts += 4));
      masterSF.forEach((t) => userSF.has(t) && (step3pts += 8));
      masterF.forEach((t) => userF.has(t) && (step3pts += 10));

      if (masterChampion && masterChampion === userChampion) step3pts += 15;

      batch.set(doc(db, "leaderboard", uid), { step3pts }, { merge: true });
    });

    await batch.commit();

    isDirtyRef.current = false;
  }, [teamsByMatchId, step3Ref]);

  useEffect(() => {
    registerSave(saveHandler);
  }, [registerSave, saveHandler]);

  const bracketColumns = useMemo(
    () => convertTeamsToColumns(teamsByMatchId),
    [teamsByMatchId],
  );

  return {
    loading,
    bracketColumns,
    handleSelectTeam,
    resetMatch,
  };
};

export default useMarkKnockoutStage;