import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";

const useViewPool = () => {
  const { userId } = useParams();
  const [picks, setPicks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    try {
      const userPicksDoc = doc(db, "userPicks", userId);

      const unsubscribe = onSnapshot(
        userPicksDoc,
        (snapshot) => {
          if (!snapshot.exists()) {
            setPicks(null);
            setError("This user has not submitted any picks.");
            setLoading(false);
            return;
          }
          const data = snapshot.data();
          setPicks(data);

          setLoading(false);
        },
        (err) => {
          console.error("Error fetching user pool:", err);
          setError("Failed to load user pool.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Unexpected error loading user pool:", err);
      setError("Failed to load user pool.");
      setLoading(false);
    }
  }, [userId]);

  return { picks, loading, error };
};

export default useViewPool;
