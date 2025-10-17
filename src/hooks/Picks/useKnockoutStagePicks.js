import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const useKnockoutStage = (user) => {
  const [step2Results, setStep2Results] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserPicks = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "userPicks", user.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.step2Picks) {
            const results = data.step2Picks.map((group) => ({
              group: group.group,
              first: group.teams[0],
              second: group.teams[1],
              third: group.teams[2],
            }));
            setStep2Results(results);
          }
        }
      } catch (err) {
        console.error("Error loading Step2 results:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserPicks();
  }, [user]);

  return { step2Results, loading };
};

export default useKnockoutStage;