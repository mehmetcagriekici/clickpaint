//imports
import { useEffect } from "react";
import { useDice } from "../hooks/useDice";
import { usePlayers } from "../hooks/usePlayers";
import { DEF_TAB_BORDER } from "../services/constants";
import { useBuild } from "../hooks/useBuild";

function Watch() {
  //custom hooks
  const { remainingTurns } = useDice();
  const { players, currentPlayerIndex } = usePlayers();
  const { onShowResult, showResult } = useBuild();

  //if no remaining turns are left
  //or only one player remains on the map
  //set result condition to true
  useEffect(() => {
    if (!remainingTurns) onShowResult();
    else if (players.some((player) => !player.ownedCells.length))
      onShowResult();
  }, [remainingTurns, players]);

  return (
    <div className="row-start-1 row-end-4 col-span-10 ">
      {showResult || (
        <div className="size-full flex flex-col justify-center items-center gap-3">
          <div>
            <div>turns left: {remainingTurns}</div>
            <div>current player: p-{currentPlayerIndex + 1}</div>
          </div>
          <table className="border-collapse rounded-md">
            <thead className="">
              <tr className="border-2 border-gray-400">
                <th scope="col" className={`${DEF_TAB_BORDER}`}>
                  player index
                </th>
                <th scope="col" className={`${DEF_TAB_BORDER}`}>
                  player score
                </th>
                <th scope="col" className={`${DEF_TAB_BORDER}`}>
                  player points
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.index}>
                  <th className={`${DEF_TAB_BORDER}`} scope="row">
                    p-{player.index + 1}
                  </th>
                  <td className={`${DEF_TAB_BORDER}`}>{player.score}</td>
                  <td className={`${DEF_TAB_BORDER}`}>{player.playerPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Watch;
