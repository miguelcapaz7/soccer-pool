import { useEffect, useState } from "react";
import { generateEmptyGroupStagePicks } from "../../../utils/Picks/GroupStage/groupStageUtils.js";

const getLocalStorageKey = (userId) => `step1Picks_${userId}`;

const useGroupStagePicks = (user) => {
  const [groupStagePicks, setGroupStagePicks] = useState(
    generateEmptyGroupStagePicks()
  );

  const handlePick = (matchId, value) => {
    setGroupStagePicks((prev) => {
      const updatedPick = { ...prev };

      updatedPick[matchId] = {
        ...updatedPick[matchId],
        result: updatedPick[matchId].result === value ? "" : value,
      };

      if (user) {
        const localKey = getLocalStorageKey(user.uid);
        localStorage.setItem(localKey, JSON.stringify(updatedPick));
      }
      return updatedPick;
    });
  };

  useEffect(() => {
    if (!user) return;

    const localKey = getLocalStorageKey(user.uid);
    const localData = localStorage.getItem(localKey);

    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setGroupStagePicks((prev) => ({ ...prev, ...parsed }));
      } catch (err) {
        console.error("Error parsing local group stage picks:", err);
      }
    }
  }, [user]);

  return { groupStagePicks, handlePick };
};

export default useGroupStagePicks;
