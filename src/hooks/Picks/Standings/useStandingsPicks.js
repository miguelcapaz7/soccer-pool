import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { generateInitialStandings } from "../../../utils/Picks/Standings/standingsUtils";
import { saveToFirestore } from "../../../utils/Picks/firestoreUtils";

const useStandingsPicks = (user) => {
  const [standings, setStandings] = useState(generateInitialStandings());
  const savingTimer = useRef(null);

  const moveTeam = (groupIndex, fromIndex, toIndex) => {
    setStandings((prev) => {
      const updatedStandings = [...prev];
      const group = updatedStandings[groupIndex];
      const teamList = [...group.teams];
      const [movedTeam] = teamList.splice(fromIndex, 1);
      teamList.splice(toIndex, 0, movedTeam);
      updatedStandings[groupIndex] = { ...group, teams: teamList };
      saveToFirestore("userPicks", { step2Picks: updatedStandings }, user, savingTimer);
      return updatedStandings;
    });
  };

  useEffect(() => {
    const loadStandings = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "userPicks", user.uid);
        const snapshot = await getDoc(docRef);
        const data = snapshot.exists() ? snapshot.data() : null;
        const savedStandings = data?.step2Picks || [];
        const emptyStandings = generateInitialStandings();
        const mergedStandings = emptyStandings.map((group, index) => {
          const savedGroup = savedStandings[index];
          return savedGroup
            ? { ...group, teams: savedGroup.teams || group.teams }
            : group;
        });
        setStandings(mergedStandings);
        saveToFirestore("userPicks", { step2Picks: mergedStandings}, user, savingTimer);
      } catch (err) {
        console.error("Error loading Step 2 picks:", err);
      }
    };
    loadStandings();
  }, [user]);

  return { groups: standings, moveTeam };
};

export default useStandingsPicks;