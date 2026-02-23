import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const MarkTopScorers = ({ registerSave, markDirty, isSaving }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedView, setSortedView] = useState(false);
  const isDirtyRef = useRef(false);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const picksSnap = await getDocs(collection(db, "userPicks"));
        const playerMap = new Map();

        picksSnap.forEach((docSnap) => {
          const data = docSnap.data();
          const picks = data.step4Picks || [];

          picks.forEach((p) => {
            const playerName = typeof p === "string" ? p : p.player;

            if (!playerMap.has(playerName)) {
              playerMap.set(playerName, {
                player: playerName,
                goals: 0,
                team: p.team ?? "",
              });
            }
          });
        });

        const masterSnap = await getDoc(doc(db, "master", "step4"));

        if (masterSnap.exists()) {
          const masterPlayers = masterSnap.data().step4Picks || [];

          masterPlayers.forEach((p) => {
            if (playerMap.has(p.player)) {
              playerMap.get(p.player).goals = p.goals;
            } else {
              playerMap.set(p.player, p);
            }
          });
        }

        const sorted = [...playerMap.values()].sort(
          (a, b) => b.goals - a.goals
        );

        setPlayers(sorted);
      } catch (err) {
        console.error("Error loading players:", err);
      }

      setLoading(false);
    };

    loadPlayers();
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
      const sorted = [...players].sort((a, b) => b.goals - a.goals);

      await setDoc(
        doc(db, "master", "step4"),
        { step4Picks: sorted },
        { merge: true },
      );

      setPlayers(sorted);
      setSortedView(true);
      isDirtyRef.current = false;
    });
  }, [players, registerSave]);

  if (loading) return <LoadingSpinner />;

  const displayPlayers = sortedView
    ? players
    : players; // keeps editing stable; sorted only after save above

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
          {displayPlayers.map((p) => (
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
