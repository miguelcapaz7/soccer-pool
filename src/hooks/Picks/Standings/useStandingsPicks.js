import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { generateInitialStandings } from "../../../utils/Picks/Standings/standingsUtils.js";

const useStandingsPicks = (user) => {
  const [standings, setStandings] = useState(
    useRef(generateInitialStandings()).current
  );
  const [thirdPlaceOrder, setThirdPlaceOrder] = useState(
    useRef(generateInitialStandings().map((g) => g.teams[2])).current
  );

  const localStorageKey = useMemo(
    () => (user ? `step2Picks_${user.uid}` : null),
    [user]
  );

  const saveToLocalStorage = useCallback((updatedStandings, updatedThirdPlace) => {
    if (!user) return;
    const data = {
      standings: updatedStandings,
      thirdPlaceOrder: updatedThirdPlace,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }, [user]);

  const moveTeam = useCallback((groupIndex, fromIndex, toIndex) => {
    setStandings((prev) => {
      const updatedStandings = prev.map((g) => ({ ...g, teams: [...g.teams] }));
      const teams = updatedStandings[groupIndex].teams;
      const [movedTeam] = teams.splice(fromIndex, 1);
      teams.splice(toIndex, 0, movedTeam);
      const updatedThirdPlace = updatedStandings.map((g) => g.teams[2]);

      setThirdPlaceOrder(updatedThirdPlace);
      saveToLocalStorage(updatedStandings, updatedThirdPlace);

      return updatedStandings;
    });
  }, [saveToLocalStorage]);

  const moveThirdPlaceTeam = useCallback((fromIndex, toIndex) => {
    setThirdPlaceOrder((prev) => {
      const updated = [...prev];
      const [movedTeam] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedTeam);

      saveToLocalStorage(standings, updated);
      return updated;
    });
  }, [standings, saveToLocalStorage]);

  useEffect(() => {
    if (!user) return;

    try {
      const savedData = localStorage.getItem(localStorageKey);
      if (!savedData) return;

      const parsed = JSON.parse(savedData);
      if (Array.isArray(parsed.standings)) {
        setStandings(parsed.standings);
      }
      if (Array.isArray(parsed.thirdPlaceOrder)) {
        setThirdPlaceOrder(parsed.thirdPlaceOrder);
      }
    } catch (err) {
      console.error("Error parsing standings:", err);
    }
 
  }, [user]);

  return { groups: standings, thirdPlaceOrder, moveTeam, moveThirdPlaceTeam };
};

export default useStandingsPicks;
