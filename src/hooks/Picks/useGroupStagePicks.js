// hooks/useGroupStagePicks.js
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const useGroupStagePicks = (user) => {
  const [picks, setPicks] = useState({});
  const savingTimer = useRef(null);

  const handlePick = (matchId, value) => {
    setPicks((prev) => {
      const updated = { ...prev };
      if (prev[matchId] === value) {
        delete updated[matchId];
      } else {
        updated[matchId] = value;
      }
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
        await setDoc(ref, { step1: newPicks }, { merge: true });
      } catch (err) {
        console.error("Error saving step1 picks:", err);
      }
    }, 600);
  };

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setPicks({});
        return;
      }
      try {
        const ref = doc(db, "userPicks", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setPicks(data.step1 || data.step1Picks || {});
        } else {
          setPicks({});
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