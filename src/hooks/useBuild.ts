//imports
import {
  endGame,
  initCells,
  initCurrentPlayer,
  initPlayers,
  initTurns,
  setDice,
  setIsDiceSet,
  setShowResult,
  startGame,
} from "../services/appSlice";
import { useAppDispatch, useAppSelector } from "./typedHooks";

export function useBuild() {
  //redux typed dispatch
  const dispatch = useAppDispatch();
  //global app state
  const { isOn, showResult } = useAppSelector((state) => state.appReducer);

  //initiate game values, after the player count is set, and game starts
  function init() {
    dispatch(setShowResult(false));
    dispatch(setIsDiceSet(true));
    dispatch(setDice());
    dispatch(initTurns());
    dispatch(initCurrentPlayer());
    dispatch(initCells());
    dispatch(initPlayers());
  }

  //start game
  //after the player count is set
  function start() {
    dispatch(startGame());
  }

  //end game
  //after this use init again to reset the app
  function end() {
    dispatch(endGame());
  }

  //show result
  function onShowResult() {
    dispatch(setShowResult(true));
  }

  return { isOn, showResult, init, start, end, onShowResult };
}
