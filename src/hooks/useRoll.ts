//imports
import { useEffect, useState } from "react";
import { RollProps } from "../services/types";
import { DICE_ROLL_INTERVAL } from "../services/constants";

//dice effect
//swaps dice image sources
export function useRoll({ dices }: RollProps) {
  //current sources of all dices
  const [currentDice, setCurrentDice] = useState("");

  //indexes
  const [index, setIndex] = useState(0);

  //increase index, and assign modulo of the index by the dices length as the new index
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % dices.length);
    }, DICE_ROLL_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [index, dices.length]);

  useEffect(() => {
    setCurrentDice(dices[index]);
  }, [index, dices]);

  return {
    currentDice,
  };
}
