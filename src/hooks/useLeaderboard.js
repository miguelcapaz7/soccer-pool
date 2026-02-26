import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "leaderboard"),
      (snap) => {
        try {
          if (snap.empty) {
            setLeaders([]);
            setLoading(false);
            return;
          }

          const rows = snap.docs.map((doc) => {
            const d = doc.data();

            const step1pts = d.step1pts || 0;
            const step2pts = d.step2pts || 0;
            const step3pts = d.step3pts || 0;
            const step4pts = d.step4pts || 0;

            const total = step1pts + step2pts + step3pts + step4pts;

            return {
              id: doc.id,
              name: d.name || "Unknown",
              winner: d.champion || "",
              step1pts,
              step2pts,
              step3pts,
              step4pts,
              total,
            };
          });

          rows.sort((a, b) => b.total - a.total);
          const ranked = rows.map((r, i) => ({ ...r, placing: i + 1 }));

          setLeaders(ranked);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setError("Failed to load leaderboard");
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Failed to load leaderboard");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { leaders, loading, error };
};

export default useLeaderboard;