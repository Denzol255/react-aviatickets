import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IFlightResult } from "../../models/IFlightResult";

// Получение данных с API
export const fetchFlights = createAsyncThunk(
  "flight/getAll",
  async (_, thunkApi) => {
    try {
      const responce = await axios.get<IFlightResult>("flights.json");
      return responce.data;
    } catch (e) {
      return thunkApi.rejectWithValue("Не удалось получить данные");
    }
  }
);
