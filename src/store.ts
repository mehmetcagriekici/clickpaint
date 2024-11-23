import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./services/appSlice";

export const store = configureStore({
  reducer: {
    appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
