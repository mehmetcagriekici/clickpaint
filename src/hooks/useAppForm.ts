//imports
import { setPlayerCount } from "../services/appSlice";
import { typePlayerCount } from "../services/types";
import { useAppDispatch, useAppSelector } from "./typedHooks";

export function useAppForm() {
  //redux typed dispatch
  const dispatch = useAppDispatch();
  //global app state
  const { playerCount } = useAppSelector((state) => state.appReducer);

  //set main dependency of the app
  function submit(formData: typePlayerCount) {
    dispatch(setPlayerCount(formData));
  }

  return { playerCount, submit };
}
