import { useEffect, useState } from "react";
import { saveToFirestore } from "../../../utils/Picks/firestoreUtils.js";

const useReviewPicks = (user) => {
  const [data, setData] = useState({
    step1Picks: {},
    step2Picks: {},
    step3Picks: {},
    step4Picks: [],
    step5Picks: {},
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const parseKey = (key) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error(`Error parsing ${key}:`, err);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!user) return alert("No user signed in!");

    try {
      await saveToFirestore("userPicks", data, user);
      alert("Final picks submitted!");
    } catch (err) {
      alert("Error saving picks. Please try again.");
    }
  };

  useEffect(() => {
    if (!user) return;

    const validationErrors = [];

    const step1Picks = parseKey(`step1Picks_${user.uid}`);
    const step2Picks = parseKey(`step2Picks_${user.uid}`);
    const step3Picks = parseKey(`step3Picks_${user.uid}`);
    const step4Picks = parseKey(`step4Picks_${user.uid}`);
    const step5Picks = parseKey(`step5Picks_${user.uid}`);

    if (
      !step1Picks ||
      Object.keys(step1Picks).length === 0 ||
      Object.values(step1Picks).some(
        (pick) => !pick.result || pick.result.trim() === ""
      )
    ) {
      validationErrors.push("Group Stage picks are incomplete.");
    }

    if (!step2Picks || Object.keys(step2Picks).length === 0) {
      validationErrors.push("Standings picks are incomplete.");
    }

    if (
      !step3Picks ||
      Object.keys(step3Picks).length === 0 ||
      Object.values(step3Picks).some(
        (pick) =>
          !Array.isArray(pick) ||
          pick.some((v) => typeof v !== "string" || v.trim() === "")
      )
    ) {
      validationErrors.push("Knockout bracket is incomplete.");
    }

    if (
      !step4Picks ||
      !Array.isArray(step4Picks) ||
      step4Picks.length !== 3 ||
      step4Picks.some((p) => !p.team || !p.player)
    ) {
      validationErrors.push("Top scorer picks are incomplete.");
    }

    if (
      !step5Picks ||
      Object.keys(step5Picks).length === 0 ||
      isNaN(step5Picks?.totalGoals)
    ) {
      validationErrors.push("Goal prediction is invalid.");
    }

    setData({
      step1Picks: step1Picks || {},
      step2Picks: step2Picks || {},
      step3Picks: step3Picks || {},
      step4Picks: Array.isArray(step4Picks) ? step4Picks : [],
      step5Picks: step5Picks || {},
    });
    setErrors(validationErrors);
    setLoading(false);
  }, [user]);

  return { data, loading, errors, handleSubmit };
};

export default useReviewPicks;
