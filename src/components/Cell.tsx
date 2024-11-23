//imports
import { useEffect, useState } from "react";
import { useAppForm } from "../hooks/useAppForm";
import { useCells } from "../hooks/useCells";
import { usePlayers } from "../hooks/usePlayers";
import {
  DEF_CELL_CLR,
  DEF_FONT,
  INIT_CELL_VAL,
  PLAYERS_READY_COLORS,
} from "../services/constants";
import { MAP_SIDE_LENGTH, PLAYER_READY_CELLS } from "../services/helpers";
import { Cell as IntCell, CellProps, Player } from "../services/types";

//assign cell colors

function Cell({ cell }: CellProps) {
  //custom hook
  const { currentPlayerIndex, players, updatePlayers } = usePlayers();
  const { updateCells } = useCells();
  const { playerCount } = useAppForm();

  //local stage for color
  const [cellColor, setCellColor] = useState("");

  //initial player owned cell colors
  useEffect(() => {
    const initialOwner = players.find(
      (player) => player.ownedCells[0] === cell.index
    );

    if (initialOwner) {
      const initialCell: IntCell = {
        ...cell,
        color: initialOwner.color,
        ownerIndex: initialOwner.index,
      };

      updateCells(initialCell);
      setCellColor(initialCell.color);
    }
  }, []);

  //copy current player
  const currentPlayer = players[currentPlayerIndex];

  function onClick(cell: IntCell) {
    //if current player has enough points and the target cell is accessible
    //or ownes the cell
    if (
      (currentPlayer.playerPoints > cell.value &&
        currentPlayer.readyCells.indexOf(cell.index) >= 0) ||
      (currentPlayer.playerPoints > INIT_CELL_VAL &&
        currentPlayer.ownedCells.indexOf(cell.index) >= 0)
    ) {
      //updated current cell
      const newCell: IntCell = {
        ...cell,
        value:
          players[currentPlayerIndex].ownedCells.indexOf(cell.index) >= 0
            ? cell.value + 0.5
            : cell.value + 1,
        color: players[currentPlayerIndex].color,
        ownerIndex: currentPlayerIndex,
      };

      //update the current on the global app state
      updateCells(newCell);

      //update cell color
      setCellColor(newCell.color);

      //check if the cell is owned by another player
      const previousOwner = players.find(
        (player) =>
          player.ownedCells.indexOf(cell.index) >= 0 &&
          player.index !== currentPlayerIndex
      );

      //new previous player to be used in updating proccess
      let newPrevious: null | Player = null;

      //if there is a previous owner create the newPrevious
      if (previousOwner) {
        const ownedCells = previousOwner.ownedCells.filter(
          (index) => index !== cell.index
        );
        const readyCells = PLAYER_READY_CELLS(
          ownedCells,
          MAP_SIDE_LENGTH(playerCount)
        );

        newPrevious = { ...previousOwner, ownedCells, readyCells };
      }

      //update current player's values
      const newOwnedCells = [
        ...new Set([...currentPlayer.ownedCells, cell.index]),
      ];
      const newReadyCells = PLAYER_READY_CELLS(
        newOwnedCells,
        MAP_SIDE_LENGTH(playerCount)
      );
      const newPlayerPoints = currentPlayer.playerPoints - cell.value;

      //create a new player object for the current player
      const newPlayer: Player = {
        ...currentPlayer,
        ownedCells: newOwnedCells,
        readyCells: newReadyCells,
        playerPoints: newPlayerPoints,
      };

      //update players array with the new player in the global app state
      updatePlayers(newPlayer);

      //if there is a newPrevious object, update players array again, but this time with the updated previous owner
      if (newPrevious) updatePlayers(newPrevious);
    }
  }

  return (
    <div
      onClick={() => onClick(cell)}
      className={`${cellColor || DEF_CELL_CLR} ${DEF_FONT} ${
        /*PLAYER READY CELLS STYLES */
        currentPlayer.readyCells.indexOf(cell.index) > -1 &&
        currentPlayer.ownedCells.indexOf(cell.index) < 0
          ? `hover:cursor-pointer ${PLAYERS_READY_COLORS[currentPlayer.index]}`
          : currentPlayer.readyCells.indexOf(cell.index) < 0 &&
            currentPlayer.ownedCells.indexOf(cell.index) < 0
          ? "hover:cursor-not-allowed"
          : "hover:cursor-pointer"
        /*/////////////////////*/
      }
      ${
        /*PLAYER OWNED CELLS BORDER STYLES*/ ""
      } text-black text-center flex flex-col`}
    >
      <span>{cell.value}</span>
      <span className={`${playerCount === 4 ? "text-xs" : ""}`}>
        {cell.ownerIndex > -1 ? `p-${cell.ownerIndex + 1}` : ""}
      </span>
    </div>
  );
}

export default Cell;
