import { useState, useRef, useEffect } from "react";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const MarkTopScorers = ({ registerSave, markDirty, isSaving }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDirtyRef = useRef(false);
  const lastSnapshotRef = useRef(null);
  const aggregatedOnceRef = useRef(false);

  useEffect(() => {
    const ref = doc(db, "master", "step4");

    const unsub = onSnapshot(ref, async (snap) => {
      const data = snap.exists() ? (snap.data().step4Picks ?? []) : [];

      // ⭐ snapshot diff guard
      if (JSON.stringify(data) === JSON.stringify(lastSnapshotRef.current)) {
        setLoading(false);
        return;
      }

      lastSnapshotRef.current = data;

      // ⭐ if master already has players → just hydrate
      if (data.length > 0 && !isDirtyRef.current) {
        setPlayers(data);
        setLoading(false);
        return;
      }

      // ⭐ aggregate user picks ONLY once when master empty
      if (!aggregatedOnceRef.current && data.length === 0) {
        aggregatedOnceRef.current = true;

        const picksSnap = await getDocs(collection(db, "userPicks"));
        const playerMap = new Map();

        picksSnap.forEach((docSnap) => {
          const picks = docSnap.data().step4Picks || [];

          picks.forEach((p) => {
            const name = typeof p === "string" ? p : p.player;

            if (!playerMap.has(name)) {
              playerMap.set(name, {
                player: name,
                goals: 0,
                team: p.team ?? "",
              });
            }
          });
        });

        setPlayers([...playerMap.values()]);
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  const increment = (player) => {
    if (isSaving) return;

    isDirtyRef.current = true;
    markDirty();

    setPlayers((prev) =>
      prev.map((p) => (p.player === player ? { ...p, goals: p.goals + 1 } : p)),
    );
  };

  const decrement = (player) => {
    if (isSaving) return;

    isDirtyRef.current = true;
    markDirty();

    setPlayers((prev) =>
      prev.map((p) =>
        p.player === player ? { ...p, goals: Math.max(0, p.goals - 1) } : p,
      ),
    );
  };

  useEffect(() => {
    registerSave(async () => {
      if (!isDirtyRef.current) return;

      const sorted = [...players].sort((a, b) => b.goals - a.goals);

      // ⭐ 1 save master
      await setDoc(
        doc(db, "master", "step4"),
        { step4Picks: sorted },
        { merge: true },
      );

      // ⭐ 2 build goal map
      const goalMap = new Map();
      sorted.forEach((p) => goalMap.set(p.player, p.goals));

      // ⭐ 3 read user picks ONLY
      const picksSnap = await getDocs(collection(db, "userPicks"));

      const batch = writeBatch(db);

      picksSnap.forEach((docSnap) => {
        const uid = docSnap.id;
        const picks = docSnap.data().step4Picks || [];

        let step4pts = 0;

        picks.forEach((p) => {
          const playerName = typeof p === "string" ? p : p.player;
          const goals = goalMap.get(playerName) || 0;
          step4pts += goals * 3;
        });

        batch.set(doc(db, "leaderboard", uid), { step4pts }, { merge: true });
      });

      await batch.commit();

      setPlayers(sorted);
      isDirtyRef.current = false;
    });
  }, [players, registerSave]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Player</th>
            <th className="text-center">Goals</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {players.map((p) => (
            <tr key={p.player}>
              <td>{p.player}</td>
              <td className="text-center fw-bold">{p.goals}</td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-danger me-2"
                  onClick={() => decrement(p.player)}
                >
                  -
                </button>

                <button
                  className="btn btn-sm btn-success"
                  onClick={() => increment(p.player)}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkTopScorers;
