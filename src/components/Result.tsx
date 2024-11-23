//impports
import { useEffect } from "react";
import { useBuild } from "../hooks/useBuild";
import { usePlayers } from "../hooks/usePlayers";
import { DEF_BORDER, DEF_FONT, DEF_THEME } from "../services/constants";

function Result() {
  //custom hook
  const { players, noDraw } = usePlayers();
  const { end, init } = useBuild();

  const zeroPlayer = {
    index: -1,
    color: "",
    ownedCells: [],
    readyCells: [],
    score: 0,
    playerPoints: -1,
  };

  const endPlayer = {
    index: -1,
    color: "",
    ownedCells: [],
    readyCells: [],
    score: Infinity,
    playerPoints: -1,
  };

  //use players array to determine the winner, when the result conditions met in the watch component
  //first compare the scores
  //then compare the areas they are occupying on the map
  //if there is draw, reset remaining turns
  const winner = players.reduce(
    (winner, currentPlayer) =>
      currentPlayer.score > winner.score
        ? currentPlayer
        : winner.score === currentPlayer.score &&
          currentPlayer.ownedCells.length > winner.ownedCells.length
        ? currentPlayer
        : winner.score === currentPlayer.score &&
          currentPlayer.ownedCells.length === winner.ownedCells.length
        ? endPlayer
        : winner,
    zeroPlayer
  );

  //if result conditions are met
  //and any two or more players
  //have the same scores
  //and occupies the same amount of cells
  useEffect(() => {
    if (winner.score === Infinity) {
      //reset the remaining turns
      noDraw();
    }
  }, []);

  //only on player click
  //return to the login form
  //reset everything
  function endGame() {
    end();
    init();
  }

  return (
    <div
      className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-dvh w-dvw flex flex-col gap-10 justify-center items-center ${DEF_THEME} ${DEF_FONT}`}
    >
      <div>player {winner.index + 1} wins!</div>
      <div>score: {winner.score}</div>
      <button
        onClick={endGame}
        className={`${DEF_BORDER} p-3 hover:text-black hover:bg-white hover:border-solid`}
      >
        End Game - back to start form
      </button>
    </div>
  );
}

export default Result;
