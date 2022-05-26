import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  sorting: {
    type: string;
  };
  transferFiltersList: Array<boolean>;
}

export const initialState: FilterState = {
  sorting: {
    type: "",
  },
  transferFiltersList: [false, false],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeSortingType: (state, action: PayloadAction<string>) => {
      state.sorting.type = action.payload;
    },
    changeTransferFiltersList: (
      state,
      action: PayloadAction<Array<boolean>>
    ) => {
      state.transferFiltersList = action.payload;
    },
  },
});

export const { changeSortingType, changeTransferFiltersList } =
  filterSlice.actions;

export default filterSlice.reducer;
