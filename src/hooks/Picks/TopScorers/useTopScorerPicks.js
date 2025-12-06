import { useEffect, useState, useMemo, useCallback } from "react";
import { generateInitialPlayerPicks } from "../../../utils/Picks/TopScorers/topScorerUtils.js";

const useTopScorerPicks = (user) => {
  const [topScorers, setTopScorers] = useState(generateInitialPlayerPicks());
  const [topScorerError, setTopScorerError] = useState("");

  const localStorageKey = useMemo(
    () => (user ? `step4Picks_${user.uid}` : null),
    [user]
  );

  const saveToLocalStorage = useCallback((updated) => {
    if (!user) return;
    localStorage.setItem(localStorageKey, JSON.stringify(updated));
  }, [user]);

  const takenPlayers = useMemo (() => {
    return new Set(
      topScorers
        .map((p) => p.player)
        .filter(Boolean)
    );
  }, [topScorers])

  const handleTeamChange = useCallback((index, team) => {
    setTopScorers((prev) => {
      const updated = [...prev];
      updated[index].team = team;
      updated[index].player = "";
      setTopScorerError("");
      saveToLocalStorage(updated);
      return updated;
    });
  }, [saveToLocalStorage]);

  const handlePlayerChange = useCallback((index, player) => {
    setTopScorers((prev) => {
      const updated = [...prev];
      updated[index].player = player;
      saveToLocalStorage(updated);
      return updated;
    })
  }, [saveToLocalStorage]);

  useEffect(() => {
    if (!user) return;

    try {
      const savedData = localStorage.getItem(localStorageKey);
      if (!savedData) return;

      const parsed = JSON.parse(savedData);
      if (Array.isArray(parsed)) {
        setTopScorers(parsed);
        return;
      }
    } catch (err) {
      console.error("Error loading Step 4 picks:", err);
    } 
    
  }, [user]);

  return {
    topScorers,
    topScorerError,
    takenPlayers,
    handleTeamChange,
    handlePlayerChange,
  };
};

export default useTopScorerPicks;
