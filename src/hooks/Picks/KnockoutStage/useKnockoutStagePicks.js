import { useState, useEffect, useMemo, useCallback } from "react";
import {
  generateBracketMap,
  generateRoundOf32,
  convertTeamsToColumns,
  updateBracketWithR32,
} from "../../../utils/Picks/KnockoutStage/knockoutStageUtils";

const useKnockoutStagePicks = (user) => {
  const [step2Results, setStep2Results] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [teamsByMatchId, setTeamsByMatchId] = useState({});
  const [missingStep2, setMissingStep2] = useState(false);

  const localKey = user ? `step3Picks_${user.uid}` : null;

  // Generate Round of 32 teams from Step2 results
  const roundOf32 = useMemo(
    () => generateRoundOf32(step2Results),
    [step2Results]
  );
  const validTeams = useMemo(
    () => new Set(roundOf32.flat().filter(Boolean)),
    [roundOf32]
  );

  // Load Step3 picks from local storage
  useEffect(() => {
    if (!localKey) return;
    const saved = localStorage.getItem(localKey);
    if (saved) {
      try {
        setTeamsByMatchId(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing Step3 picks:", err);
      }
    }
  }, [localKey]);

  // Persist Step 3 picks to local storage
  useEffect(() => {
    if (!localKey) return;
    localStorage.setItem(localKey, JSON.stringify(teamsByMatchId));
  }, [teamsByMatchId, localKey]);

  // Load Step 2 results from local storage
  useEffect(() => {
    if (!user) return;
    const standingsKey = `step2Picks_${user.uid}`;
    const savedStandings = localStorage.getItem(standingsKey);

    if (savedStandings) {
      try {
        const parsed = JSON.parse(savedStandings);
        if (Array.isArray(parsed.standings)) {
          const groupTop2 = parsed.standings.map(({ group, teams }) => ({
            group,
            first: teams[0],
            second: teams[1],
          }));
          const thirdPlaceTop8 = Array.isArray(parsed.thirdPlaceOrder)
            ? parsed.thirdPlaceOrder.slice(0, 8)
            : [];
          setStep2Results({ groups: groupTop2, thirdPlace: thirdPlaceTop8 });
        }
      } catch (err) {
        console.error("Error parsing Step 2 picks from localStorage:", err);
      }
    } else {
      setMissingStep2(true);
    }
    setLoading(false);
  }, [user]);

  // Initialize bracket after Step 2 results load
  useEffect(() => {
    if (loading || initialized || missingStep2) return;
    setTeamsByMatchId((prev) => {
      if (Object.keys(prev).length === 0) {
        return updateBracketWithR32(prev, roundOf32, validTeams);
      }
      return prev; // Keep existing picks
    });
    setInitialized(true);
  }, [loading, initialized, roundOf32, validTeams]);

  // Handles team selection and propogate winners
  const handleSelectTeam = useCallback(
    (matchId, colIndex, matchupIndex, teamIndex) => {
      const teamName = teamsByMatchId[matchId]?.[teamIndex];
      if (!teamName) return;

      const totalCols = 9;
      const midPoint = Math.floor(totalCols / 2);
      const isLeftSide = colIndex < midPoint;
      const nextCol = isLeftSide ? colIndex + 1 : colIndex - 1;
      const nextMatchup = Math.floor(matchupIndex / 2);
      const nextSlot = matchupIndex % 2 === 0 ? 0 : 1;

      setTeamsByMatchId((prev) => {
        const updated = { ...prev };

        if (matchId === "F") {
          const winner = prev["F"]?.[teamIndex];
          if (winner) updated["CHAMPION"] = [winner];
          return updated;
        }

        // Handle semifinal → final & 3rd place
        if (matchId.startsWith("SF")) {
          const opponentIdx = teamIndex === 0 ? 1 : 0;
          const opponent = prev[matchId]?.[opponentIdx];
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
          const winner = prev["3P"]?.[teamIndex];
          if (winner) {
            updated["3rdWinner"] = [winner]; // store as single-element array (consistent with CHAMPION)
          }
          return updated;
        }

        // Find next match in bracket map
        const nextMatch = Object.entries(generateBracketMap).find(
          ([, meta]) =>
            meta.colIndex === nextCol && meta.matchupIndex === nextMatchup
        );

        if (nextMatch) {
          const [nextMatchId] = nextMatch;
          updated[nextMatchId] = updated[nextMatchId] || ["", ""];
          updated[nextMatchId][nextSlot] = teamName;
        }
        return updated;
      });
    },
    [teamsByMatchId]
  );

  // Convert team state to bracket columns for rendering
  const bracketColumns = useMemo(
    () => convertTeamsToColumns(teamsByMatchId),
    [teamsByMatchId]
  );

  return {
    bracket: bracketColumns,
    step2Results,
    handleSelectTeam,
    loading,
    missingStep2,
  };
};

export default useKnockoutStagePicks;
