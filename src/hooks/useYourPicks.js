import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useYourPicks = () => {
  const { user } = useAuth();
  const userId = user?.uid;
  const [picks, setPicks] = useState({});
  const [masterPicks, setMasterPicks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const steps = [
    { key: "step1Picks", title: "Group Stage", step: 1 },
    { key: "step2Picks", title: "Group Standings", step: 2 },
    { key: "step3Picks", title: "Knockout Stage Bracket", step: 3 },
    { key: "step4Picks", title: "Total Goals Prediction", step: 4 },
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

          setLoading(false);
        },
        (err) => {
          console.error("Error fetching user pool:", err);
          setError("Failed to load user pool.");
          setLoading(false);
        },
      );

      const masterUnsub = onSnapshot(doc(db, "master", "step1"), (snap) => {
        setMasterPicks(snap.data()?.step1Picks ?? {});
      });

      return () => {
        unsubscribe();
        masterUnsub();
      };
    } catch (err) {
      console.error("Unexpected error loading user pool:", err);
      setError("Failed to load user pool.");
      setLoading(false);
    }
  }, [userId]);

  return { picks, masterPicks, loading, error, steps, navigate };
};

export default useYourPicks;
