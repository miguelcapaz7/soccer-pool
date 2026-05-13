import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  doc,
  onSnapshot,
  setDoc,
  getDocs,
  collection,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { generateInitialStandings } from "../../../utils/Picks/Standings/standingsUtils";

const useMarkStandings = ({ registerSave, markDirty, isSaving }) => {
  const [standings, setStandings] = useState(
    useRef(generateInitialStandings()).current,
  );
  const [thirdPlaceOrder, setThirdPlaceOrder] = useState([]);
  const thirdPlaceTeams = useMemo(
    () =>
      standings.map((g) => ({
        group: g.group,
        team: g.teams[2],
      })),
    [standings],
  );

  const [loading, setLoading] = useState(true);
  const isDirtyRef = useRef(false);

  const moveTeam = useCallback(
    (groupIndex, fromIndex, toIndex) => {
      if (isSaving) return;

      isDirtyRef.current = true;
      markDirty();
      setStandings((prev) => {
        const updatedStandings = prev.map((g) => ({
          ...g,
          teams: [...g.teams],
        }));
        const teams = updatedStandings[groupIndex].teams;
        const [movedTeam] = teams.splice(fromIndex, 1);
        teams.splice(toIndex, 0, movedTeam);

        const availableThirdPlaceTeams = updatedStandings.map((g) => ({
          group: g.group,
          team: g.teams[2],
        }));

        // ⭐ remove selections that no longer exist
        const updatedSelections = thirdPlaceOrder.filter((selection) =>
          availableThirdPlaceTeams.some(
            (t) => t.group === selection.group && t.team === selection.team,
          ),
        );

        setThirdPlaceOrder(updatedSelections);

        return updatedStandings;
      });
    },
    [thirdPlaceOrder, markDirty, isSaving],
  );

  const toggleThirdPlaceTeam = useCallback(
    (teamObj) => {
      if (isSaving) return;

      isDirtyRef.current = true;
      markDirty();
      setThirdPlaceOrder((prev) => {
        const exists = prev.some((t) => t.team === teamObj.team);

        let updated;

        if (exists) {
          updated = prev.filter((t) => t.team !== teamObj.team);
        } else {
          if (prev.length >= 8) {
            return prev;
          }

          updated = [...prev, teamObj];
        }

        return updated;
      });
    },
    [markDirty, isSaving],
  );

  useEffect(() => {
    const ref = doc(db, "master", "step2");

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        setLoading(false);
        return;
      }

      if (!isDirtyRef.current) {
        const step2 = snap.data().step2Picks ?? {};

        setStandings(step2.standings ?? generateInitialStandings());
        setThirdPlaceOrder(step2.thirdPlaceOrder ?? []);
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  useEffect(() => {
    registerSave(async () => {
      if (!isDirtyRef.current) return;

      const ref = doc(db, "master", "step2");

      // ⭐ 1 save master
      await setDoc(
        ref,
        {
          step2Picks: { standings, thirdPlaceOrder },
        },
        { merge: true },
      );

      const advancingThirdPlaceTeams = thirdPlaceOrder.map((t) => t.team);

      // ⭐ 2 read user picks
      const userSnap = await getDocs(collection(db, "userPicks"));

      const batch = writeBatch(db);

      userSnap.forEach((userDoc) => {
        const uid = userDoc.id;

        const userStep2 = userDoc.data()?.step2Picks ?? {};

        const userStandings = userStep2.standings ?? [];
        const userThirdPlaceOrder = userStep2.thirdPlaceOrder ?? [];

        const userAdvancingThirdPlaceTeams = userThirdPlaceOrder.map(
          (t) => t.team,
        );

        let step2pts = 0;

        standings.forEach((masterGroup) => {
          const userGroup = userStandings.find(
            (g) => g.group === masterGroup.group,
          );

          if (!userGroup) return;

          // ⭐ MASTER advancing teams
          const masterAdvancingTeams = [
            masterGroup.teams[0],
            masterGroup.teams[1],
          ];

          if (advancingThirdPlaceTeams.includes(masterGroup.teams[2])) {
            masterAdvancingTeams.push(masterGroup.teams[2]);
          }

          // ⭐ USER advancing teams
          const userAdvancingTeams = [userGroup.teams[0], userGroup.teams[1]];

          if (userAdvancingThirdPlaceTeams.includes(userGroup.teams[2])) {
            userAdvancingTeams.push(userGroup.teams[2]);
          }

          // ⭐ score all advancing picks
          userGroup.teams.slice(0, 3).forEach((team, index) => {
            // advancing correctly
            if (
              userAdvancingTeams.includes(team) &&
              masterAdvancingTeams.includes(team)
            ) {
              step2pts += 2;
              console.log(`${team} correctly advances +2 pts. Total: ${step2pts}`)
            }

            // exact standing bonus
            if (
              team === masterGroup.teams[index] &&
              masterAdvancingTeams.includes(team) &&
              userAdvancingTeams.includes(team)
            ) {
              step2pts += 2;
              console.log(`${team} correct standing bonus +2 pts. Total: ${step2pts}`)
            }
          });
        });

        batch.set(doc(db, "leaderboard", uid), { step2pts }, { merge: true });
      });

      await batch.commit();

      isDirtyRef.current = false;
    });
  }, [standings, thirdPlaceOrder, registerSave]);

  return {
    standings,
    thirdPlaceTeams,
    selectedThirdPlaceTeams: thirdPlaceOrder,
    moveTeam,
    toggleThirdPlaceTeam,
    loading,
  };
};

export default useMarkStandings;
