import { DndProvider } from "react-dnd";
import { useState, useRef, useCallback, useEffect } from "react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { HTML5Backend } from "react-dnd-html5-backend";
import GroupTable from "../../../../components/GroupTable";
import ThirdPlaceTable from "../../../../components/Picks/Standings/ThirdPlaceTable";
import { generateInitialStandings } from "../../../../utils/Picks/Standings/standingsUtils";

const MarkStandings = ({ registerSave, markDirty, isSaving }) => {
  const [standings, setStandings] = useState(
    useRef(generateInitialStandings()).current,
  );
  const [thirdPlaceOrder, setThirdPlaceOrder] = useState(
    useRef(
      generateInitialStandings().map((g) => ({
        group: g.group,
        team: g.teams[2],
      })),
    ).current,
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
        const updatedThirdPlace = updatedStandings.map((g) => ({
          group: g.group,
          team: g.teams[2],
        }));

        setThirdPlaceOrder(updatedThirdPlace);

        return updatedStandings;
      });
    },
    [markDirty, isSaving],
  );

  const moveThirdPlaceTeam = useCallback(
    (fromIndex, toIndex) => {
      if (isSaving) return;

      isDirtyRef.current = true;
      markDirty();
      setThirdPlaceOrder((prev) => {
        const updated = [...prev];
        const [movedTeam] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, movedTeam);

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
      const ref = doc(db, "master", "step2");

      await setDoc(
        ref,
        {
          step2Picks: {
            standings,
            thirdPlaceOrder,
          },
        },
        { merge: true },
      );

      isDirtyRef.current = false;
    });
  }, [standings, thirdPlaceOrder, registerSave]);

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Groups Grid */}
      <div className="row g-4">
        {standings.map((group, index) => (
          <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={group.group}>
            <GroupTable
              group={group}
              groupIndex={index}
              moveTeam={moveTeam}
              draggable={true}
            />
          </div>
        ))}
      </div>
      {/* Third-place ranking */}
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-8 col-lg-6">
          <ThirdPlaceTable
            teams={thirdPlaceOrder}
            moveTeam={moveThirdPlaceTeam}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default MarkStandings;
