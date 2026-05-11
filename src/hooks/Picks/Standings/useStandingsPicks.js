import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { generateInitialStandings } from "../../../utils/Picks/Standings/standingsUtils.js";
import { generateEmptyTeamsMap } from "../../../utils/Picks/KnockoutStage/knockoutStageUtils.js";

const useStandingsPicks = (user) => {
  const [standings, setStandings] = useState(
    useRef(generateInitialStandings()).current,
  );

  const [thirdPlaceOrder, setThirdPlaceOrder] = useState([]);
  const thirdPlaceTeams = useMemo(
    () =>
      standings.map((g) => ({
        group: g.group,
        team: g.teams[2],
      })),
    [standings],
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

  const clearKnockoutStage = useCallback(() => {
    if (!user) return;

    const step3Key = `step3Picks_${user.uid}`;

    const emptyBracket = generateEmptyTeamsMap();

    localStorage.setItem(step3Key, JSON.stringify(emptyBracket));
  }, [user]);

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

        const availableThirdPlaceTeams = updatedStandings.map((g) => ({
          group: g.group,
          team: g.teams[2],
        }));

        // ⭐ remove selections that no longer exist
        const updatedSelections = thirdPlaceOrder.filter((selection) =>
          availableThirdPlaceTeams.some(
            (t) => t.group === selection.group && t.team === selection.team,
          ),
        );

        setThirdPlaceOrder(updatedSelections);

        saveToLocalStorage(updatedStandings, updatedSelections);
        clearKnockoutStage();

        return updatedStandings;
      });
    },
    [thirdPlaceOrder, saveToLocalStorage, clearKnockoutStage],
  );

  const toggleThirdPlaceTeam = useCallback(
    (teamObj) => {
      setThirdPlaceOrder((prev) => {
        const exists = prev.some((t) => t.team === teamObj.team);

        let updated;

        if (exists) {
          updated = prev.filter((t) => t.team !== teamObj.team);
        } else {
          if (prev.length >= 8) {
            return prev;
          }

          updated = [...prev, teamObj];
        }

        saveToLocalStorage(standings, updated);
        clearKnockoutStage();

        return updated;
      });
    },
    [standings, saveToLocalStorage, clearKnockoutStage],
  );

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

  return {
    groups: standings,
    thirdPlaceTeams,
    selectedThirdPlaceTeams: thirdPlaceOrder,
    moveTeam,
    toggleThirdPlaceTeam,
  };
};

export default useStandingsPicks;
