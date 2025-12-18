import { DndProvider } from "react-dnd";
import { useState, useRef, useCallback } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import GroupTable from "../../../../components/GroupTable";
import ThirdPlaceTable from "../../../../components/Picks/Standings/ThirdPlaceTable";
import { generateInitialStandings } from "../../../../utils/Picks/Standings/standingsUtils";

const MarkStandings = () => {
  const [standings, setStandings] = useState(
    useRef(generateInitialStandings()).current
  );
  const [thirdPlaceOrder, setThirdPlaceOrder] = useState(
    useRef(generateInitialStandings().map((g) => g.teams[2])).current
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
        const updatedThirdPlace = updatedStandings.map((g) => g.teams[2]);

        setThirdPlaceOrder(updatedThirdPlace);

        return updatedStandings;
      });
    },
    []
  );

  const moveThirdPlaceTeam = useCallback(
    (fromIndex, toIndex) => {
      setThirdPlaceOrder((prev) => {
        const updated = [...prev];
        const [movedTeam] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, movedTeam);

        return updated;
      });
    },
    [standings]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Groups Grid */}
      <div className="row g-4">
        {standings.map((group, index) => (
          <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={standings.group}>
            <GroupTable
              group={group}
              groupIndex={index}
              moveTeam={moveTeam}
              draggable={true}
            />
          </div>
        ))}
      </div>
      {/* Third-place ranking */}
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-8 col-lg-6">
          <ThirdPlaceTable
            teams={thirdPlaceOrder}
            moveTeam={moveThirdPlaceTeam}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default MarkStandings;
