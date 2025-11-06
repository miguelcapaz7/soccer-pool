import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const useReviewPicks = (user) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const ref = doc(db, "userPicks", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const picks = snap.data();
          const validationErrors = [];

          // Validate each step
          if (!picks.step1Picks || Object.keys(picks.step1Picks).some((value) => value === "")) {
            validationErrors.push("Group Stage picks are incomplete.");
          }
          if (!picks.step2Picks || picks.step2Picks.length !== 12) {
            validationErrors.push("Standings picks are incomplete.");
          }
          if (!picks.bracket || picks.bracket.length === 0) {
            validationErrors.push("Knockout bracket is incomplete.");
          }
          const topScorer = JSON.parse(localStorage.getItem("topScorerPicks"));
          const goalPrediction = localStorage.getItem("goalPrediction");
          if (!topScorer || topScorer.length !== 3 || topScorer.some(p => !p.team || !p.player)) {
            validationErrors.push("Top scorer picks are incomplete.");
          }
          if (!goalPrediction || isNaN(goalPrediction)) {
            validationErrors.push("Goal prediction is invalid.");
          }

          setData({ ...picks, topScorer, goalPrediction });
          setErrors(validationErrors);
        }
      } catch (err) {
        console.error("Error loading review data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { data, loading, errors };
};

export default useReviewPicks;
