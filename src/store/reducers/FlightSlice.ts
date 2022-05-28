import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFlight } from "../../models/IFlight";
import { IBestPrices } from "../../models/IBestPrices";
import { fetchFlights } from "./ActionCreators";
import { IFlightResult } from "../../models/IFlightResult";

// State и reducers для перелетов
interface FlightState {
  flights: IFlight[];
  bestPrices: IBestPrices;
  isLoading: boolean;
  error: string;
  flightsLimit: number;
}

export const initialState: FlightState = {
  flights: [],
  bestPrices: {
    DIRECT: {
      bestFlights: [],
    },
    ONE_CONNECTION: {
      bestFlights: [],
    },
  },
  isLoading: false,
  error: "",
  flightsLimit: 5,
};

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setNewFlights: (state, action: PayloadAction<IFlight[]>) => {
      state.flights = action.payload;
    },
    changeFlightsLimit: (state, action: PayloadAction<number>) => {
      state.flightsLimit += action.payload;
    },
  },
  extraReducers: {
    [fetchFlights.fulfilled.type]: (
      state,
      action: PayloadAction<IFlightResult>
    ) => {
      state.isLoading = false;
      state.flights = action.payload.result.flights;
      state.bestPrices = action.payload.result.bestPrices;
    },
    [fetchFlights.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchFlights.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setNewFlights, changeFlightsLimit } = flightSlice.actions;
export default flightSlice.reducer;
