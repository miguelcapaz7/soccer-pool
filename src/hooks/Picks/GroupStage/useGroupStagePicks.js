import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { generateEmptyGroupStagePicks } from "../../../utils/Picks/GroupStage/groupStageUtils";
import { saveToFirestore } from "../../../utils/Picks/firestoreUtils";

const useGroupStagePicks = (user) => {
  const [groupStagePicks, setGroupStagePicks] = useState(generateEmptyGroupStagePicks());
  const savingTimer = useRef(null);

  const handlePick = (matchId, value) => {
    setGroupStagePicks((prev) => {
      const updatedPick = { ...prev };
      updatedPick[matchId] = prev[matchId] === value ? "" : value;
      saveToFirestore("userPicks", { step1Picks: updatedPick }, user, savingTimer);
      return updatedPick;
    });
  };

  useEffect(() => {
    const loadGroupStagePicks = async () => {
      if (!user) {
        return;
      }
      try {
        const ref = doc(db, "userPicks", user.uid);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          const data = snapshot.data();
          const savedGroupStagePicks = data.step1Picks || {};
          const emptyGroupStagePicks = generateEmptyGroupStagePicks();
          const mergedGroupStagePicks = { ...emptyGroupStagePicks, ...savedGroupStagePicks };
          setGroupStagePicks(mergedGroupStagePicks);
          saveToFirestore("userPicks", { step1Picks: mergedGroupStagePicks }, user, savingTimer)
        } 
      } catch (err) {
        console.error("Error loading step1 picks:", err);
      }
    };
    loadGroupStagePicks();
  }, [user]);

  return { groupStagePicks, handlePick };
};

export default useGroupStagePicks;