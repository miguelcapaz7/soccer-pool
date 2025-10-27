import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  generateEmptyBracket,
  generateRoundOf32,
  matchIdMap
} from "../../utils/knockoutStageUtils";

const useKnockoutStagePicks = (user) => {
  const [step2Results, setStep2Results] = useState([]);
  const [bracket, setBracket] = useState(generateEmptyBracket());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserPicks = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "userPicks", user.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();

          if (data.step2Picks) {
            const results = data.step2Picks.map((group) => ({
              group: group.group,
              first: group.teams[0],
              second: group.teams[1],
              third: group.teams[2],
            }));
            setStep2Results(results);
          }
          if (data.step3Picks) {
            setTimeout(() => {
              applyStep3PicksToBracket(data.step3Picks);
            }, 0)
          }
        }
      } catch (err) {
        console.error("Error loading Step2 results:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserPicks();
  }, [user]);

  useEffect(() => {
    if (step2Results.length === 0) return;

    const roundOf32 = generateRoundOf32(step2Results);
    const validTeams = new Set(roundOf32.flat().filter((t) => t !== ""));

    setBracket((prev) => {
      const updated = prev.map((col) =>
        col.map((match) =>
          match.map((team) => (validTeams.has(team) ? team : ""))
        )
      );


      updated[0] = roundOf32.slice(0, 8);
      updated[8] = roundOf32.slice(8, 16);
      return updated;
    });
    
    const saveR32Matches = async () => {
      if (!user) return;

      const r32Pairs = {};
      roundOf32.forEach((pair, index) => {
        const matchId = index < 8 ? `R32-M${index + 1}` : `R32-M${index + 1}`;
        r32Pairs[matchId] = pair;
      });

      try {
        const docRef = doc(db, "userPicks", user.uid);
        await updateDoc(docRef, { step3Picks: r32Pairs }, { merge: true });
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.step3Picks) {
            applyStep3PicksToBracket(data.step3Picks);
          }
        }
      } catch (err) {
        console.error("Error saving R32 matches:", err);
      }
    };

    saveR32Matches();
    
    const cleanupOutdatedPicks = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "userPicks", user.uid);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) return;

        const data = snapshot.data();
        const picks = data.step3Picks || {};

        const updatedPicks = {};
        for (const [matchId, teams] of Object.entries(picks)) {
          if (matchId.startsWith("R32")) {
            const [teamA, teamB] = teams;
            if (!validTeams.has(teamA) || !validTeams.has(teamB)) {
              continue; // skip outdated R32 pair
            }
          }
          updatedPicks[matchId] = teams;
        }

        await updateDoc(docRef, { step3Picks: updatedPicks });
      } catch (err) {
        console.error("Error cleaning up outdated picks:", err);
      }
    };

    cleanupOutdatedPicks();
  }, [step2Results]);
  
  const applyStep3PicksToBracket = (picks) => {
    setBracket((prev) => {
      const updated = prev.map((col) => col.map((match) => [...match]));

      Object.entries(picks).forEach(([matchId, teams]) => {
        const pos = matchIdMap[matchId];
        
        if (!pos || !Array.isArray(teams)) return;
        
        const { colIndex, matchupIndex } = pos;
        updated[colIndex][matchupIndex] = [...teams];
      });

      return updated;
    });
  };

  const saveStep3Picks = async (matchId, matchup) => {
    if (!user) return;
    try {
      const docRef = doc(db, "userPicks", user.uid);
      await updateDoc(docRef, {[`step3Picks.${matchId}`]: matchup, }, { merge: true });
    } catch (err) {
      console.error("Error saving Step 3 picks:", err);
    }
  };

  const handleSelectTeam = (colIndex, matchupIndex, teamIndex) => {
    const teamName = bracket[colIndex][matchupIndex][teamIndex];
    if (!teamName) return;

    const totalCols = bracket.length;
    const midPoint = Math.floor(totalCols / 2);
    const isLeftSide = colIndex < midPoint;

    const nextCol = isLeftSide ? colIndex + 1 : colIndex - 1;
    const nextMatchupIndex = Math.floor(matchupIndex / 2);
    const nextSlot = matchupIndex % 2 === 0 ? 0 : 1;

    setBracket((prev) => {
      const updated = prev.map((col) => col.map((match) => [...match]));

      if (
        (isLeftSide && nextCol > midPoint) ||
        (!isLeftSide && nextCol < midPoint)
      ) {
        return updated;
      }

      if (
        (isLeftSide && nextCol === midPoint) ||
        (!isLeftSide && nextCol === midPoint)
      ) {
        const semis = updated[colIndex];
        const opponentName = semis[matchupIndex][1 - teamIndex];
        const isLeftWinnerSlot = isLeftSide ? 0 : 1;

        if (updated[midPoint][0]) {
          updated[midPoint][0][isLeftWinnerSlot] = teamName;
        }

        const isLeftLoserSlot = isLeftSide ? 0 : 1;
        if (updated[midPoint][1]) {
          updated[midPoint][1][isLeftLoserSlot] = opponentName;
        }

        return updated;
      }

      if (updated[nextCol] && updated[nextCol][nextMatchupIndex]) {
        updated[nextCol][nextMatchupIndex][nextSlot] = teamName;
      }
      return updated;
    });
    const currentMatchId = Object.entries(matchIdMap).find(
      ([_, pos]) => pos.colIndex === colIndex && pos.matchupIndex === matchupIndex
    )?.[0];

    if (currentMatchId) {
      const currentMatchup = [...bracket[colIndex][matchupIndex]];
      saveStep3Picks(currentMatchId, currentMatchup);
    }
  };

  return { bracket, step2Results, handleSelectTeam, loading };
};

export default useKnockoutStagePicks;