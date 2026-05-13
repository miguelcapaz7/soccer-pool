import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useYourPicks = () => {
  const { user } = useAuth();
  const userId = user?.uid;
  const [picks, setPicks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const steps = [
    { key: "step1Picks", title: "Step 1", step: 1 },
    { key: "step2Picks", title: "Step 2", step: 2 },
    { key: "step3Picks", title: "Step 3", step: 3 },
    { key: "step4Picks", title: "Step 4", step: 4 },
  ];

  useEffect(() => {
    if (!userId) return;

    try {
      const userPicksDoc = doc(db, "userPicks", userId);

      const unsubscribe = onSnapshot(
        userPicksDoc,
        (snapshot) => {
          if (!snapshot.exists()) {
            setPicks(null);
            setError("You have not submitted your picks yet.");
            setLoading(false);
            return;
          }
          const data = snapshot.data();
          setPicks(data);

          console.log("User picks loaded:", data);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching user pool:", err);
          setError("Failed to load user pool.");
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Unexpected error loading user pool:", err);
      setError("Failed to load user pool.");
      setLoading(false);
    }
  }, [userId]);

  return { picks, loading, error, steps };
};

export default useYourPicks;
