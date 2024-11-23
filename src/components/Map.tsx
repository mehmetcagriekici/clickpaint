//imports
import { useAppForm } from "../hooks/useAppForm";
import { useBuild } from "../hooks/useBuild";
import { useCells } from "../hooks/useCells";
//import { MAP_SIDE_LENGTH } from "../services/constants";
import Cell from "./Cell";

function Map() {
  //custom hook
  const { cells } = useCells();
  const { playerCount } = useAppForm();
  const { end } = useBuild();

  //function to immediately terminate the game
  function onClick() {
    end();
  }

  //map: square grid, col-row length: Math.sqrt(cells.length) or 2 * playercount + 1
  //const sideLength = MAP_SIDE_LENGTH(playerCount);
  const gridRowCol =
    playerCount === 2
      ? "grid-rows-5 grid-cols-5"
      : playerCount === 3
      ? "grid-rows-7 grid-cols-7"
      : "grid-cols-9 grid-rows-9";

  return (
    <div
      className={`row-start-4 row-end-10 col-span-10 bg-black grid ${gridRowCol} gap-1 mt-3 lg:col-start-3 lg:col-end-9`}
    >
      {cells.map((cell) => (
        <Cell key={cell.index} cell={cell} />
      ))}
      <button className={`fixed bottom-5 right-5`} onClick={onClick}>
        end game
      </button>
    </div>
  );
}

export default Map;
