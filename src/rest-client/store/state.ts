import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RestMethodEnum } from "../app/rest-method/rest-method";
interface AppState {
  history: RequestState[];
}

export interface RequestState {
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
    addModifyRequestState: (
      state: AppState,
      action: PayloadAction<RequestState>
    ) => {
      console.log("action.payload", action.payload);
      const { url, method, headers, body, response, error, loading } =
        action.payload;
      const index = state.history.findIndex((request) => request.url === url);
      if (index === -1) {
        state.history.push(action.payload);
      } else {
        state.history[index] = {
          url,
          method,
          headers,
          body,
          response,
          error,
          loading,
        };
      }
    },
  },
});

export const { addModifyRequestState } = appStateSlice.actions;

export const selectHistory = (state: AppState) => {
  console.log(state);
  return state.history;
};

export default appStateSlice.reducer;
