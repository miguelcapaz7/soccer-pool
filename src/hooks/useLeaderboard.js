import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "leaderboard"),
      orderBy("total", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const result = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          placing: index + 1,
          ...doc.data(),
        }));

        setLeaders(result);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { leaders, loading, error };
};

export default useLeaderboard;
