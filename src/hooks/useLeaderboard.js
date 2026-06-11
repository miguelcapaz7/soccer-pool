import { useEffect, useState } from "react";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getRankedLeaders } from "../utils/leaderboardUtils";

const useLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const columnHeaders = {
    placing: "#",
    name: "Name",
    step1pts: "Step 1",
    step2pts: "Step 2",
    step3pts: "Step 3",
    total: "Total",
    winner: "Winner",
  };
  const columns = Object.keys(columnHeaders);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "leaderboard"),
      (snap) => {
        try {
          const ranked = getRankedLeaders(snap);
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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "metadata", "leaderboard"),
      (snap) => {
        setLastUpdated(snap.data()?.lastUpdated?.toDate() ?? null);
      },
    );

    return () => unsubscribe();
  }, []);

  return { leaders, loading, error, columnHeaders, columns, lastUpdated, };
};

export default useLeaderboard;
