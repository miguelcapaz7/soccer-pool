import { useEffect, useState } from "react";
import { getUserPicks } from "../../../utils/Picks/KnockoutStage/knockoutStageUtils";
import useBracket from "./useBracket"

const useKnockoutStagePicks = (user) => {
  const [step2Results, setStep2Results] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bracket, handleSelectTeam, applyStep3PicksToBracket, updateBracketFromStep2 } = useBracket(user, step2Results);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const data = await getUserPicks(user.uid);
      if (!data) return;

      if (data.step2Picks) {
        const results = data.step2Picks.map(({ group, teams }) => ({
          group,
          first: teams[0],
          second: teams[1],
          third: teams[2],
        }));
        setStep2Results(results);
      }
      
      if (data.step3Picks) {
        applyStep3PicksToBracket(data.step3Picks);
      }

      setLoading(false);
    })();
  }, [user]);
  
  useEffect(() => {
    if (step2Results.length === 0) return; 
    updateBracketFromStep2(); 
  }, [step2Results]);

  return { bracket, step2Results, handleSelectTeam, loading };
};

export default useKnockoutStagePicks;