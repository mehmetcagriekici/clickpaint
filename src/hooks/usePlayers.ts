//imports
import { initTurns, setPlayers, setShowResult } from "../services/appSlice";
import { Player } from "../services/types";
import { useAppDispatch, useAppSelector } from "./typedHooks";

export function usePlayers() {
  //typed redux dispatch
  const dispatch = useAppDispatch();
  //global app state
  const { currentPlayerIndex, players } = useAppSelector(
    (state) => state.appReducer
  );

  //update players array with the new player
  function updatePlayers(newPlayer: Player) {
    dispatch(setPlayers(newPlayer));
  }

  //if draw reset turns
  function noDraw() {
    dispatch(initTurns());
    dispatch(setShowResult(false));
  }

  return { currentPlayerIndex, players, updatePlayers, noDraw };
}
