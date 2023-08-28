import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RestMethodEnum } from "../app/rest-method/rest-method";
interface AppState {
  history: RequestState[];
}

export interface RequestState {
  id: string;
  url: string;
  method: RestMethodEnum;
  headers: string;
  body: string;
  response: string;
  error: string;
  loading: boolean;
}

const initialAppState: AppState = {
  history: [],
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: {
    addHistory: (state: AppState, action: PayloadAction<RequestState>) => {
      state.history.push(action.payload);
    },
  },
});

export const { addHistory } = appStateSlice.actions;

export const selectHistory = (state: AppState) => {
  return state.history?.map((x) => x).reverse();
};

export default appStateSlice.reducer;
