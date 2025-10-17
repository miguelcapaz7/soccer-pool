import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { GroupsData } from "../../data/GroupsData";


const useStandingsPicks = (user) => {
  const [groups, setGroups] = useState(GroupsData);

  useEffect(() => {
    const loadUserPicks = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "userPicks", user.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.step2Picks) setGroups(data.step2Picks);
        }
      } catch (err) {
        console.error("Error loading Step 2 picks:", err);
      }
    };
    loadUserPicks();
  }, [user]);

  const saveToFirestore = useCallback(
    async (updatedGroups) => {
      if (!user) return;
      try {
        const docRef = doc(db, "userPicks", user.uid);
        await setDoc(docRef, { step2Picks: updatedGroups }, { merge: true });
      } catch (err) {
        console.error("Error saving Step 2 picks:", err);
      }
    },
    [user]
  );

  const moveTeam = (groupIndex, fromIndex, toIndex) => {
    setGroups((prev) => {
      const updatedGroups = [...prev];
      const group = updatedGroups[groupIndex];
      const teamList = [...group.teams];
      const [movedTeam] = teamList.splice(fromIndex, 1);
      teamList.splice(toIndex, 0, movedTeam);
      updatedGroups[groupIndex] = { ...group, teams: teamList };
      saveToFirestore(updatedGroups);
      return updatedGroups;
    });
  };

  return { groups, moveTeam };
};

export default useStandingsPicks;
