import { combineReducers, configureStore } from "@reduxjs/toolkit";
import flightReducer from "./reducers/FlightSlice";
import filterReducer from "./reducers/FilterSlice";

const rootReducer = combineReducers({ flightReducer, filterReducer });

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
