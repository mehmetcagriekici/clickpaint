//imports
import {
  setCurrentPlayer,
  setDice,
  setIsDiceSet,
  setTurns,
} from "../services/appSlice";
import { Player } from "../services/types";
import { useAppDispatch, useAppSelector } from "./typedHooks";
import { useEffect } from "react";
import { usePlayers } from "./usePlayers";

export function useDice() {
  //redux dispatch
  const dispatch = useAppDispatch();
  //global app state
  const {
    currentPlayerIndex,
    players,
    dice,
    remainingTurns,
    playerCount,
    isDiceSet,
  } = useAppSelector((state) => state.appReducer);
  //custom hook
  const { updatePlayers } = usePlayers();

  //update players after the current player index is updated
  useEffect(() => {
    //copy current player
    const currentPlayer = players[currentPlayerIndex];

    //create a new player
    const newPlayer: Player = {
      ...currentPlayer,
      playerPoints: currentPlayer.playerPoints + dice,
    };

    //update players array using the new player
    updatePlayers(newPlayer);
  }, [currentPlayerIndex]); //only when the currentPlayerIndex is updated, and when initiated

  //set a new dice
  function updateDice() {
    dispatch(setDice());
  }

  //set isDiceSet to true
  function onDiceReady() {
    dispatch(setIsDiceSet(true));
  }

  //set isDiceSet to false
  function onDiceUnready() {
    dispatch(setIsDiceSet(false));
  }

  //complete a turn after all players played
  function endTurn() {
    if (currentPlayerIndex % playerCount === playerCount - 1)
      dispatch(setTurns());
  }

  //update the current player index
  function nextPlayer() {
    dispatch(setCurrentPlayer());
  }

  return {
    dice,
    isDiceSet,
    remainingTurns,
    updateDice,
    onDiceReady,
    onDiceUnready,
    endTurn,
    nextPlayer,
  };
}
