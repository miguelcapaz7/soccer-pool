import { useMemo, useState, useCallback, useEffect } from "react";
import {
  generateBracketMap,
  generateRoundOf32,
  convertTeamsToColumns,
  updateBracketWithR32,
} from "../../../utils/Picks/KnockoutStage/knockoutStageUtils";

const useBracket = (user, step2Results) => {
  const localKey = user ? `step3Picks_${user.uid}` : null;
  const [teamsByMatchId, setTeamsByMatchId] = useState({});

  const roundOf32 = useMemo(
    () => generateRoundOf32(step2Results),
    [step2Results]
  );
  const validTeams = useMemo(
    () => new Set(roundOf32.flat().filter(Boolean)),
    [roundOf32]
  );

  useEffect(() => {
    if (!localKey) return;
    const saved = localStorage.getItem(localKey);
    if (saved) {
      try {
        setTeamsByMatchId(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing Step3 picks from localStorage:", err);
      }
    }
  }, [localKey]);

  useEffect(() => {
    if (!localKey) return;
    localStorage.setItem(localKey, JSON.stringify(teamsByMatchId));
  }, [teamsByMatchId, localKey]);

  const updateBracketFromStep2 = useCallback(() => {
    setTeamsByMatchId((prev) =>
      updateBracketWithR32(prev, roundOf32, validTeams)
    );
  }, [roundOf32, validTeams]);

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
          if (winner) {
            updated["CHAMPION"] = [winner];
          }
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

  const bracketColumns = useMemo(
    () => convertTeamsToColumns(teamsByMatchId),
    [teamsByMatchId]
  );

  return {
    bracket: bracketColumns,
    handleSelectTeam,
    updateBracketFromStep2,
    teamsByMatchId,
  };
};

export default useBracket;
