import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { generateEmptyGroupStagePicks } from "../../../utils/Picks/GroupStage/groupStageUtils.js";

const useGroupStagePicks = (user) => {
  const [groupStagePicks, setGroupStagePicks] = useState(
    useRef(generateEmptyGroupStagePicks()).current
  );

  const localStorageKey = useMemo(
    () => (user ? `step1Picks_${user.uid}` : null),
    [user]
  );

  const saveToLocalStorage = useCallback((updatedPick) => {
    if (!user) return;
    localStorage.setItem(localStorageKey, JSON.stringify(updatedPick));
  }, [user]);

  const handlePick = useCallback((matchId, value) => {
    setGroupStagePicks((prev) => {
      const updatedPick = { 
        ...prev,
        [matchId]: {
          ...prev[matchId],
          result: prev[matchId].result === value ? "" : value
        }
      };

      saveToLocalStorage(updatedPick)

      return updatedPick;
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;

    try {
      const savedData = localStorage.getItem(localStorageKey);
      if (!savedData) return;

      const parsed = JSON.parse(savedData);
      setGroupStagePicks((prev) => ({ ...prev, ...parsed }));
    } catch (err) {
      console.error("Error parsing local group stage picks:", err);
    }

  }, [user]);

  return { groupStagePicks, handlePick };
};

export default useGroupStagePicks;
