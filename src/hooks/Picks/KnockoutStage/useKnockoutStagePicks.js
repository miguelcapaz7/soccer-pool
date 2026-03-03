import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  generateBracketMap,
  generateEmptyTeamsMap,
  generateRoundOf32,
  convertTeamsToColumns,
  updateBracketWithR32,
} from "../../../utils/Picks/KnockoutStage/knockoutStageUtils";

const useKnockoutStagePicks = (user) => {
  const [step2Results, setStep2Results] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamsByMatchId, setTeamsByMatchId] = useState(generateEmptyTeamsMap());
  const [missingStep2, setMissingStep2] = useState(false);
  const navigate = useNavigate();

  const localStorageKey = useMemo(
    () => (user ? `step3Picks_${user.uid}` : null),
    [user]
  );

  // Generate Round of 32 teams from Step2 results
  const roundOf32 = useMemo(
    () => generateRoundOf32(step2Results),
    [step2Results]
  );
  const validTeams = useMemo(
    () => new Set(roundOf32.flat().filter(Boolean)),
    [roundOf32]
  );

  // Load Step 2 results from local storage
  useEffect(() => {
    if (!user) return;

    const standingsKey = `step2Picks_${user.uid}`;
    const savedStandings = localStorage.getItem(standingsKey);

    if (!savedStandings) {
      setMissingStep2(true);
      setLoading(false);
      return;
    }
    try {
      const parsed = JSON.parse(savedStandings);
      if (
        Array.isArray(parsed.standings) &&
        Array.isArray(parsed.thirdPlaceOrder)
      ) {
        const groupTop2 = parsed.standings.map(({ group, teams }) => ({
          group,
          first: teams[0],
          second: teams[1],
        }));
        const thirdPlaceTop8 = parsed.thirdPlaceOrder.slice(0, 8);

        setStep2Results({ groups: groupTop2, thirdPlace: thirdPlaceTop8 });
      }
    } catch (err) {
      console.error("Error parsing Step 2 picks from localStorage:", err);
    }

    setLoading(false);
  }, [user]);

  // Initialize bracket after Step 2 results load
  useEffect(() => {
    if (!loading && !missingStep2 && step2Results) {
      setTeamsByMatchId((prev) =>
        updateBracketWithR32(prev, roundOf32, validTeams)
      );
    }
  }, [loading, missingStep2, step2Results, roundOf32, validTeams]);

  // Load Step3 picks from local storage
  useEffect(() => {
    if (loading || !localStorageKey) return;

    const savedData = localStorage.getItem(localStorageKey);
    if (!savedData) return;

    try {
      const parsed = JSON.parse(savedData);
      setTeamsByMatchId((prev) => {
        const merged = { ...prev };

        Object.entries(parsed).forEach(([matchId, teams]) => {
          if (!matchId.startsWith("R32")) {
            merged[matchId] = teams;
          }
        });
        saveStep3(merged);
        return merged;
      });
    } catch (err) {
      console.error("Error parsing Step3 picks:", err);
    }
  }, [loading, localStorageKey]);

  const saveStep3 = useCallback(
    (data) => {
      if (!localStorageKey) return;
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    },
    [localStorageKey]
  );

  const resetMatch = useCallback(
    (matchId) => {
      setTeamsByMatchId((prev) => {
        const updated = { ...prev };

        // Clear this match's picks
        updated[matchId] =
          matchId === "CHAMPION" || matchId === "3rdWinner" ? [""] : ["", ""];

        if (matchId === "3P" || matchId.startsWith("SF")) {
          updated["3rdWinner"] = [""];
        }

        // Clear downstream matches (propagation)
        Object.entries(generateBracketMap).forEach(([id, meta]) => {
          if (meta.dependsOn?.includes(matchId)) {
            updated[id] = ["", ""];
          }
        });
        saveStep3(updated);
        return updated;
      });
    },
    [saveStep3]
  );

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
          updated["CHAMPION"] = [teamName];
          saveStep3(updated);
          return updated;
        }

        // Handle semifinal → final & 3rd place
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
          saveStep3(updated);
          return updated;
        }

        if (matchId === "3P") {
          updated["3rdWinner"] = [teamName];
          saveStep3(updated);
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
        saveStep3(updated);
        return updated;
      });
    },
    [teamsByMatchId, saveStep3]
  );

  // Convert team state to bracket columns for rendering
  const bracketColumns = useMemo(
    () => convertTeamsToColumns(teamsByMatchId),
    [teamsByMatchId]
  );

  return {
    bracket: bracketColumns,
    handleSelectTeam,
    resetMatch,
    loading,
    missingStep2,
    navigate,
  };
};

export default useKnockoutStagePicks;
