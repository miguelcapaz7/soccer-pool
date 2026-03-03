import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToFirestore } from "../../../utils/Picks/firestoreUtils.js";
import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";

const useReviewPicks = (user) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const steps = {
    step1Picks: {
      stage: "Group Stage",
      initialState: {},
      validate: (val) =>
        val &&
        Object.keys(val).length > 0 &&
        !Object.values(val).some(
          (pick) => !pick.result || pick.result.trim() === ""
        ),
    },
    step2Picks: {
      stage: "Standings",
      initialState: {},
      validate: (val) => val && Object.keys(val).length > 0,
    },
    step3Picks: {
      stage: "Knockout Stage",
      initialState: {},
      validate: (val) =>
        val &&
        Object.keys(val).length > 0 &&
        !Object.values(val).some(
          (pick) =>
            !Array.isArray(pick) ||
            pick.some((v) => typeof v !== "string" || v.trim() === "")
        ),
    },
    step4Picks: {
      stage: "Top Scorers",
      initialState: [],
      validate: (val) =>
        Array.isArray(val) &&
        val.length === 3 &&
        !val.some((p) => !p.team || !p.player),
    },
    step5Picks: {
      stage: "Total Goals Prediction",
      initialState: {},
      validate: (val) => val && typeof val.totalGoals === "string" &&
    val.totalGoals.trim() !== "" &&
    !Number.isNaN(Number(val.totalGoals)),
    },
  };

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

    await updateDoc(doc(db, "users", user.uid), {
      picksSubmitted: true,
    });

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    const name =
      `${userData?.firstName ?? ""} ${userData?.lastName ?? ""}`.trim() ||
      "Unknown";

    const champion = data?.step3Picks?.CHAMPION?.[0] || "";

    await setDoc(
      doc(db, "leaderboard", user.uid),
      {
        name,
        step1pts: 0,
        step2pts: 0,
        step3pts: 0,
        step4pts: 0,
        total: 0,
        champion,
      },
      { merge: true }
    );

    alert("Final picks submitted!");
  } catch (err) {
    console.error(err);
    alert("Error saving picks. Please try again.");
  }
};

  useEffect(() => {
    if (!user) return;

    const validationErrors = [];
    const loadedData = {};

    Object.entries(steps).forEach(([key, cfg]) => {
      const localKey = `${key}_${user.uid}`;
      const value = parseKey(localKey) ?? cfg.initialState;

      loadedData[key] = value;

      if (!cfg.validate(value)) validationErrors.push(cfg.stage);
    });

    setData(loadedData);
    setErrors(validationErrors);
    setLoading(false);
  }, [user]);

  return { data, loading, errors, handleSubmit, navigate };
};

export default useReviewPicks;
