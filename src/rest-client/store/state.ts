import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RestMethodEnum } from "../app/rest-method/rest-method";
interface AppState {
  history: RequestState[];
}

export interface RequestState {
  id: string;
  url: string;
  date: Date;
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

export const selectHistory = (
  state: AppState
): Record<string, RequestState[]> => {
  const historyObj: Record<string, RequestState[]> = {};
  state.history?.forEach((x) => {
    if (!historyObj[x.date.toLocaleDateString()]) {
      historyObj[x.date.toLocaleDateString()] = [x];
    } else {
      historyObj[x.date.toLocaleDateString()].unshift(x);
    }
  });
  return historyObj;
};

export default appStateSlice.reducer;
