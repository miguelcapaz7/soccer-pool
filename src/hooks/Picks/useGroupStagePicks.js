// hooks/useGroupStagePicks.js
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { generateEmptyGroupStagePicks } from "../../utils/groupStageUtils.js";

const useGroupStagePicks = (user) => {
  const [picks, setPicks] = useState(generateEmptyGroupStagePicks());
  const savingTimer = useRef(null);

  const handlePick = (matchId, value) => {
    setPicks((prev) => {
      const updated = { ...prev };
      updated[matchId] = prev[matchId] === value ? "" : value;
      scheduleSave(updated);
      return updated;
    });
  };

  const scheduleSave = (newPicks) => {
    if (savingTimer.current) {
      clearTimeout(savingTimer.current);
    }

    savingTimer.current = setTimeout(async () => {
      if (!user) {
        console.warn("User not signed in — picks are not saved to Firestore.");
        return;
      }
      try {
        const ref = doc(db, "userPicks", user.uid);
        await setDoc(ref, { step1Picks: newPicks }, { merge: true });
      } catch (err) {
        console.error("Error saving step1 picks:", err);
      }
    }, 600);
  };

  useEffect(() => {
    const load = async () => {
      if (!user) {
        return;
      }
      try {
        const ref = doc(db, "userPicks", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          const savedPicks = data.step1Picks || {};
          const emptyPicks = generateEmptyGroupStagePicks();
          const merged = { ...emptyPicks, ...savedPicks };
          setPicks(merged);
          scheduleSave(merged)
        } 
      } catch (err) {
        console.error("Error loading step1 picks:", err);
      }
    };

    load();
  }, [user]);

  return { picks, handlePick };
};

export default useGroupStagePicks;