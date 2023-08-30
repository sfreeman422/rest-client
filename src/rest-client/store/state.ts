import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RestMethodEnum } from "../app/rest-method/rest-method";
interface AppState {
  history: RequestState[];
  collection: CollectionState[];
}

export interface CollectionState {
  [cname: string]: RequestState[];
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
  collection: [],
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: {
    addHistory: (state: AppState, action: PayloadAction<RequestState>) => {
      state.history.push(action.payload);
    },
    addCollection: (state: AppState, action: PayloadAction<RequestState>) => {
      const { origin, pathname, search } = new URL(action.payload.url);
      console.log(origin);
      console.log(pathname);
      console.log(search);
      const existingRequest = state.collection.find((x) => x[origin]);
      const existingRequestHasUrl = existingRequest?.[origin].find(
        (x) => x.url === action.payload.url
      );
      if (existingRequest && !existingRequestHasUrl) {
        existingRequest[origin].push(action.payload);
      } else if (!existingRequest) {
        const collection: CollectionState = {
          [origin]: [action.payload],
        };
        state.collection.push(collection);
      }
    },
  },
});

export const { addHistory, addCollection } = appStateSlice.actions;

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

export const selectCollections = (
  state: AppState
): Record<string, RequestState[]> => {
  const collectionObj: Record<string, RequestState[]> = {};
  state.collection?.forEach((x) => {
    const origin = Object.keys(x)[0];
    collectionObj[origin] = x[origin];
  });
  console.log(collectionObj);
  return collectionObj;
};

export default appStateSlice.reducer;
