import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "leaderboard"),
      async (lbSnap) => {
        try {
          // ⭐ parallel fetch supporting collections
          const [usersSnap, picksSnap] = await Promise.all([
            getDocs(collection(db, "users")),
            getDocs(collection(db, "userPicks")),
          ]);

          const userMap = new Map();
          usersSnap.forEach((u) => {
            const d = u.data();
            const name =
              `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim() || "Unknown";
            userMap.set(u.id, name);
          });

          const picksMap = new Map();
          picksSnap.forEach((p) => picksMap.set(p.id, p.data()));

          // ⭐ build leaderboard rows
          const rows = lbSnap.docs.map((doc) => {
            const uid = doc.id;
            const lb = doc.data();
            const picks = picksMap.get(uid) || {};

            const winner = picks?.step3Picks?.CHAMPION?.[0] || "";

            const step1pts = lb.step1pts || 0;
            const step2pts = lb.step2pts || 0;
            const step3pts = lb.step3pts || 0;
            const step4pts = lb.step4pts || 0;

            const total = step1pts + step2pts + step3pts + step4pts

            return {
              id: uid,
              name: userMap.get(uid) || "Unknown",
              step1pts,
              step2pts,
              step3pts,
              step4pts,
              total,
              winner,
            };
          });

          // ⭐ sort client side
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
