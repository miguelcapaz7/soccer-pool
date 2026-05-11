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

      // ⭐ 2 read user picks
      const userSnap = await getDocs(collection(db, "userPicks"));

      const batch = writeBatch(db);

      userSnap.forEach((userDoc) => {
        const uid = userDoc.id;
        const userStandings = userDoc.data()?.step2Picks?.standings ?? [];

        let step2pts = 0;

        standings.forEach((masterGroup) => {
          const userGroup = userStandings.find(
            (g) => g.group === masterGroup.group,
          );

          if (!userGroup) return;

          const masterTop2 = masterGroup.teams.slice(0, 2);
          const userTop2 = userGroup.teams.slice(0, 2);

          // ⭐ team in top2
          userTop2.forEach((team) => {
            if (masterTop2.includes(team)) step2pts += 2;
          });

          // ⭐ correct position bonus
          if (userGroup.teams[0] === masterGroup.teams[0]) step2pts += 2;
          if (userGroup.teams[1] === masterGroup.teams[1]) step2pts += 2;
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
