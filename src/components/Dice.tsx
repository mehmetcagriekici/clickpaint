//imports
import { useEffect, useState } from "react";
import { useDice } from "../hooks/useDice";
import { useRoll } from "../hooks/useRoll";
import { DICE_ROLL_DURATION, DICES } from "../services/constants";

function Dice() {
  //custom hooks
  const {
    dice,
    isDiceSet,
    updateDice,
    endTurn,
    nextPlayer,
    onDiceReady,
    onDiceUnready,
  } = useDice();
  const { currentDice: src } = useRoll({ dices: DICES });

  //current dice src
  const [currentDiceSrc, setCurrentDiceSrc] = useState(`d${dice}.png`);

  //after some time assign dice, nexPlayer, and turn, and set isDiceSet to true
  //use updated dice for local state (when isDiceSet is true)
  useEffect(() => {
    if (!isDiceSet) {
      setTimeout(() => {
        onDiceReady();
        appNext();
      }, DICE_ROLL_DURATION);
    } else {
      setCurrentDiceSrc(`d${dice}.png`);
    }
  }, [isDiceSet]);

  //assign dice value, next player, and turn
  //run after the dice is run
  function appNext() {
    nextPlayer(); //update the current player index
    updateDice(); //update the dice
    endTurn(); //complete a turn after all players played
  }

  function onClick() {
    onDiceUnready();
  }

  return (
    <div className="row-start-11 row-end-12 col-start-3 col-end-9 text-4xl grid grid-rows-4 grid-cols-7 lg:col-start-4 lg:col-end-7">
      <div
        onClick={onClick}
        className="row-start-1 row-end-6 col-start-2 col-end-4"
      >
        <img
          src={isDiceSet ? currentDiceSrc : src}
          alt="https://game-icons.net/1x1/delapouite/dice-six-faces-five.html"
          className="size-full object-contain"
        />
      </div>
      <div className=" row-start-2 row-end-4 col-start-5 col-end-7 flex items-center justify-center">
        <span className="pr-3">dice:</span>
        {dice}
      </div>
    </div>
  );
}

export default Dice;
