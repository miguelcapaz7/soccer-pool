
import { useMemo, useState } from "react";
import {
  generateBracket, 
  generateRoundOf32,
  convertBracketMapToColumns,
  updateBracketWithR32,
  updateStep3Picks,
} from "../../../utils/Picks/KnockoutStage/knockoutStageUtils";

const useBracket = (user, step2Results) => {  
  const [bracket, setBracket] = useState(generateBracket())
  const { bracketMap } = bracket;

  const roundOf32 = useMemo(() => generateRoundOf32(step2Results), [step2Results]);
  const validTeams = useMemo(() => new Set(roundOf32.flat().filter(t => t !== "")), [roundOf32]);

  const applyStep3PicksToBracket = (picks) => {
    setBracket((prev) => {
      const updatedMap = { ...prev.bracketMap };
      Object.entries(picks).forEach(([matchId, teams]) => {
        if (updatedMap[matchId]) {
          updatedMap[matchId].teams = [...teams];
        }
      });
      const updatedColumns = convertBracketMapToColumns(updatedMap);
      return { bracketMap: updatedMap, bracketColumns: updatedColumns };
    });
  };

  const updateBracketFromStep2 = async () => {
    const updatedMap = updateBracketWithR32(bracketMap, roundOf32, validTeams);
    const updatedColumns = convertBracketMapToColumns(updatedMap);
    setBracket({ bracketMap: updatedMap, bracketColumns: updatedColumns });

    if (!user) return;
    
    const fullInit = Object.entries(updatedMap).reduce((acc, [matchId, data]) => {
      acc[`step3Picks.${matchId}`] = [...data.teams];
      return acc;
    }, {});

    try {
      await updateStep3Picks(user.uid, fullInit);
    } catch (err) {
      console.error("Error initializing empty matches:", err);
    }
  };

  const saveStep3Picks = async (matchId, matchup) => {
    if (!user) return;
    await updateStep3Picks(user.uid, { [`step3Picks.${matchId}`]: matchup });
  };

  const handleSelectTeam = (matchId, colIndex, matchupIndex, teamIndex) => {
    const teamName = bracketMap[matchId].teams[teamIndex];
    if (!teamName) return;

    setBracket((prev) => {
      const updatedMap = { ...prev.bracketMap };
      const totalCols = 9;
      const midPoint = Math.floor(totalCols / 2);
      const isLeftSide = colIndex < midPoint;

      const nextCol = isLeftSide ? colIndex + 1 : colIndex - 1;
      const nextMatchupIndex = Math.floor(matchupIndex / 2);
      const nextSlot = matchupIndex % 2 === 0 ? 0 : 1;

      const currentMatch = updatedMap[matchId];
      const opponentIndex = teamIndex === 0 ? 1 : 0;
      const opponentName = currentMatch.teams[opponentIndex];

      if (matchId.startsWith("SF")) {
        const finalMatch = updatedMap["F"];
        const thirdPlaceMatch = updatedMap["3P"];

        if (isLeftSide) {
          finalMatch.teams[0] = teamName;
          thirdPlaceMatch.teams[0] = opponentName;
        } else {
          finalMatch.teams[1] = teamName;
          thirdPlaceMatch.teams[1] = opponentName;
        }

        saveStep3Picks("F", [...finalMatch.teams]);
        saveStep3Picks("3P", [...thirdPlaceMatch.teams]);
      } else {
        const nextMatch = Object.entries(updatedMap).find(
          ([, val]) =>
            val.colIndex === nextCol && val.matchupIndex === nextMatchupIndex
        );

        if (nextMatch) {
          const [nextId, nextVal] = nextMatch;
          nextVal.teams[nextSlot] = teamName;
          updatedMap[nextId] = nextVal;
          saveStep3Picks(nextId, [...nextVal.teams]);
        }
      }

      saveStep3Picks(matchId, [...currentMatch.teams]);

      const updatedColumns = convertBracketMapToColumns(updatedMap);
      return { bracketMap: updatedMap, bracketColumns: updatedColumns };
    });
  };

  return {
    bracket: bracket.bracketColumns,
    handleSelectTeam,
    applyStep3PicksToBracket,
    updateBracketFromStep2
  };

};

export default useBracket;