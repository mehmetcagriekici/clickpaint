//imports
import { setCells } from "../services/appSlice";
import { Cell } from "../services/types";
import { useAppDispatch, useAppSelector } from "./typedHooks";

export function useCells() {
  //typed redux dispatch
  const dispatch = useAppDispatch();
  //global app state
  const { cells } = useAppSelector((state) => state.appReducer);

  //update the cells array on the global state with the new cell
  function updateCells(newCell: Cell) {
    dispatch(setCells(newCell));
  }

  return { cells, updateCells };
}
