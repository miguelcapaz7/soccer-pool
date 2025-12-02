import { useEffect, useState } from "react";
import { generateInitialPlayerPicks } from "../../../utils/Picks/TopScorers/topScorerUtils.js";

const getLocalStorageKey = (userId) => `step4Picks_${userId}`;

const useTopScorerPicks = (user) => {
  const [selections, setSelections] = useState(generateInitialPlayerPicks());
  const [error, setError] = useState("");

  const handleTeamChange = (index, value) => {
    const updated = [...selections];
    updated[index].team = value;
    updated[index].player = "";
    setSelections(updated);
    setError("");
  };

  const handlePlayerChange = (index, value) => {
    const updated = [...selections];
    updated[index].player = value;
    setSelections(updated);
    validate(updated);
    if (user) {
      const localKey = getLocalStorageKey(user.uid);
      localStorage.setItem(localKey, JSON.stringify(updated));
    }
  };

  const validate = (currentSelections = selections) => {
    const incomplete = currentSelections.some(
      (sel) => !sel.team || !sel.player
    );
    if (incomplete) {
      setError("Please select both a team and a player for each pick!");
      return false;
    }
    const playerNames = currentSelections
      .map((sel) => sel.player)
      .filter(Boolean);
    const hasDuplicates = new Set(playerNames).size !== playerNames.length;
    if (hasDuplicates) {
      setError("You cannot pick the same player more than once!");
      return false;
    }
    setError("");
    return true;
  };

  useEffect(() => {
    if (!user) return;

    const localKey = getLocalStorageKey(user.uid);
    const localData = localStorage.getItem(localKey);

    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) {
          setSelections(parsed);
          return;
        }
      } catch (err) {
        console.error("Error loading Step 4 picks:", err);
      } 
    }
  }, [user]);

  return {
    selections,
    error,
    handleTeamChange,
    handlePlayerChange,
    validate,
  };
};

export default useTopScorerPicks;
