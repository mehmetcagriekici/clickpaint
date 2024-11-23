//imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

//REDUX TypeScript tutorial code
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
