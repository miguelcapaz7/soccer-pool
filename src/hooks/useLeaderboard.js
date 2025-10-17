import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const useLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "leaderboard"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => a.placing - b.placing);
        setLeaders(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaders, loading, error };
}

export default useLeaderboard;
