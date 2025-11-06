import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { generateInitialPlayerPicks } from "../../../utils/Picks/TopScorers/topScorerUtils";

const useTopScorerPicks = (user) => {
  const [selections, setSelections] = useState(generateInitialPlayerPicks());
  const [error, setError] = useState("");
  const savingTimer = useRef(null);

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
  };

  const validate = (
    currentSelections = selections) => {
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

  const scheduleSave = (newSelections) => {
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
        await setDoc(ref, { step4Picks: newSelections }, { merge: true });
      } catch (err) {
        console.error("Error saving step4 picks:", err);
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
          const savedPicks = data.step4Picks || {};
          const emptyPicks = generateInitialPlayerPicks();
          const merged = { ...emptyPicks, ...savedPicks };
          setSelections(merged);
          scheduleSave(merged);
        }
      } catch (err) {
        console.error("Error loading step4 picks:", err);
      }
    };

    load();
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
