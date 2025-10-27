import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { generateInitialStandings } from "../../utils/standingsUtils";

const useStandingsPicks = (user) => {
  const [standings, setStandings] = useState(generateInitialStandings());

  const saveToFirestore = useCallback(
    async (updatedStandings) => {
      if (!user) return;
      try {
        const docRef = doc(db, "userPicks", user.uid);
        await setDoc(docRef, { step2Picks: updatedStandings }, { merge: true });
      } catch (err) {
        console.error("Error saving Step 2 picks:", err);
      }
    },
    [user]
  );

  const moveTeam = (groupIndex, fromIndex, toIndex) => {
    setStandings((prev) => {
      const updatedStandings = [...prev];
      const group = updatedStandings[groupIndex];
      const teamList = [...group.teams];
      const [movedTeam] = teamList.splice(fromIndex, 1);
      teamList.splice(toIndex, 0, movedTeam);
      updatedStandings[groupIndex] = { ...group, teams: teamList };
      saveToFirestore(updatedStandings);
      return updatedStandings;
    });
  };

  useEffect(() => {
    const loadUserPicks = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "userPicks", user.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.step2Picks) {
            setStandings(data.step2Picks);
          } else {
            const initialStandings = generateInitialStandings();
            setStandings(initialStandings);
            await saveToFirestore(initialStandings);
          } 
        } else {
          const initialStandings = generateInitialStandings();
          setStandings(initialStandings);
          await saveToFirestore(initialStandings);
        }

      } catch (err) {
        console.error("Error loading Step 2 picks:", err);
      }
    };
    loadUserPicks();
  }, [user, saveToFirestore]);

  return { groups: standings, moveTeam };
};

export default useStandingsPicks;