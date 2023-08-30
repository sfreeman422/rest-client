import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RestMethodEnum } from "../app/rest-method/rest-method";
import { removePlaceholder, stripPlaceHolderValues } from "./util";
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
      state.history.push({
        ...action.payload,
        url: stripPlaceHolderValues(action.payload.url),
      });
    },
    addCollection: (state: AppState, action: PayloadAction<RequestState>) => {
      const { origin } = new URL(action.payload.url);
      const existingRequest = state.collection.find((x) => x[origin]);
      console.log("modifiedUrl", removePlaceholder(action.payload.url));
      const modifiedPayload = {
        ...action.payload,
        url: removePlaceholder(action.payload.url),
      };
      const hasOrigin = existingRequest?.[origin].find(
        (x) => x.url === modifiedPayload.url
      );
      if (existingRequest && !hasOrigin) {
        existingRequest[origin].push(modifiedPayload);
      } else if (!existingRequest) {
        const collection: CollectionState = {
          [origin]: [modifiedPayload],
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
