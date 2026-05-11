import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { generateInitialStandings } from "../../../utils/Picks/Standings/standingsUtils.js";
import { generateEmptyTeamsMap } from "../../../utils/Picks/KnockoutStage/knockoutStageUtils.js";

const useStandingsPicks = (user) => {
  const [standings, setStandings] = useState(
    useRef(generateInitialStandings()).current,
  );
  const [thirdPlaceOrder, setThirdPlaceOrder] = useState(
    useRef(
      generateInitialStandings().map((g) => ({
        group: g.group,
        team: g.teams[2],
      })),
    ).current,
  );

  const localStorageKey = useMemo(
    () => (user ? `step2Picks_${user.uid}` : null),
    [user],
  );

  const saveToLocalStorage = useCallback(
    (updatedStandings, updatedThirdPlace) => {
      if (!user) return;
      const data = {
        standings: updatedStandings,
        thirdPlaceOrder: updatedThirdPlace,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    },
    [user],
  );

  const moveTeam = useCallback(
    (groupIndex, fromIndex, toIndex) => {
      setStandings((prev) => {
        const updatedStandings = prev.map((g) => ({
          ...g,
          teams: [...g.teams],
        }));
        const teams = updatedStandings[groupIndex].teams;
        const [movedTeam] = teams.splice(fromIndex, 1);
        teams.splice(toIndex, 0, movedTeam);
        const updatedThirdPlace = updatedStandings.map((g) => ({
          group: g.group,
          team: g.teams[2],
        }));

        setThirdPlaceOrder(updatedThirdPlace);
        saveToLocalStorage(updatedStandings, updatedThirdPlace);
        clearKnockoutStage();

        return updatedStandings;
      });
    },
    [saveToLocalStorage],
  );

  const moveThirdPlaceTeam = useCallback(
    (fromIndex, toIndex) => {
      setThirdPlaceOrder((prev) => {
        const updated = [...prev];
        const [movedTeam] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, movedTeam);

        saveToLocalStorage(standings, updated);
        clearKnockoutStage();
        return updated;
      });
    },
    [standings, saveToLocalStorage],
  );

  const clearKnockoutStage = useCallback(() => {
    if (!user) return;

    const step3Key = `step3Picks_${user.uid}`;

    const emptyBracket = generateEmptyTeamsMap();

    localStorage.setItem(step3Key, JSON.stringify(emptyBracket));
  }, [user]);

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
