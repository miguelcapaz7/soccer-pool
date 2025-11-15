import { useEffect, useState } from "react";
import useBracket from "./useBracket";

const useKnockoutStagePicks = (user) => {
  const [step2Results, setStep2Results] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const { bracket, handleSelectTeam, updateBracketFromStep2 } = useBracket(user, step2Results);

  useEffect(() => {
    if (!user) return;

    const standingsKey = `standingsPicks_${user.uid}`;
    const savedStandings = localStorage.getItem(standingsKey);
    console.log(savedStandings)

    
    if (savedStandings) {
      try {
        const parsed = JSON.parse(savedStandings);

        if (Array.isArray(parsed.standings)) {
          const groupResults = parsed.standings.map(({ group, teams }) => ({
            group,
            first: teams[0],
            second: teams[1],
          }));

          const thirdPlaceTop8 = Array.isArray(parsed.thirdPlaceOrder)
            ? parsed.thirdPlaceOrder.slice(0, 8)
            : [];

          const results = {
            groups: groupResults,
            thirdPlace: thirdPlaceTop8,
          };

          setStep2Results(results);
        }
      } catch (err) {
        console.error("Error parsing Step 2 picks from localStorage:", err);
      }
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (loading) return;
    if (initialized) return;

    updateBracketFromStep2();
    setInitialized(true);
  }, [loading, step2Results, updateBracketFromStep2]);

  return { bracket, step2Results, setStep2Results, handleSelectTeam, loading };
};

export default useKnockoutStagePicks;
