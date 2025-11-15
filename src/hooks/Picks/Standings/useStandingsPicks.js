import { useEffect, useState } from "react";
import { generateInitialStandings } from "../../../utils/Picks/Standings/standingsUtils";

const getLocalStorageKey = (uid) => `standingsPicks_${uid}`;

const useStandingsPicks = (user) => {
  const [standings, setStandings] = useState(generateInitialStandings());
  const [thirdPlaceOrder, setThirdPlaceOrder] = useState([]);

  const moveTeam = (groupIndex, fromIndex, toIndex) => {
    setStandings((prev) => {
      const updatedStandings = [...prev];
      const group = updatedStandings[groupIndex];
      const teamList = [...group.teams];
      const [movedTeam] = teamList.splice(fromIndex, 1);
      teamList.splice(toIndex, 0, movedTeam);
      updatedStandings[groupIndex] = { ...group, teams: teamList };

      saveToLocalStorage(updatedStandings, thirdPlaceOrder);

      return updatedStandings;
    });
  };

  const moveThirdPlaceTeam = (fromIndex, toIndex) => {
    setThirdPlaceOrder((prev) => {
      const updated = [...prev];
      const [movedTeam] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedTeam);

      saveToLocalStorage(standings, updated);
      return updated;
    });
  };

  const saveToLocalStorage = (updatedStandings, updatedThirdPlace) => {
    if (user) {
      const localKey = getLocalStorageKey(user.uid);
      const data = {
        standings: updatedStandings,
        thirdPlaceOrder: updatedThirdPlace,
      };
      localStorage.setItem(localKey, JSON.stringify(data));
    }
  };

  useEffect(() => {
    if (!user) return;

    const localKey = getLocalStorageKey(user.uid);
    const localData = localStorage.getItem(localKey);

    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed.standings)) {
          setStandings(parsed.standings);
        }
        if (Array.isArray(parsed.thirdPlaceOrder)) {
          setThirdPlaceOrder(parsed.thirdPlaceOrder);
        }
      } catch (err) {
        console.error("Error parsing local standings:", err);
      }
    } else {
      const initialThirdPlace = standings.map((group) => group.teams[2]);
      setThirdPlaceOrder(initialThirdPlace);
    }
  }, [user]);

  useEffect(() => {
    const initialThirdPlace = standings.map((group) => group.teams[2]);
    setThirdPlaceOrder(initialThirdPlace);
  }, [standings]);

  return { groups: standings, thirdPlaceOrder, moveTeam, moveThirdPlaceTeam };
};

export default useStandingsPicks;
