import { configureStore } from "@reduxjs/toolkit";
import { appStateSlice } from "./state";

export const store = configureStore({
  reducer: { appState: appStateSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
