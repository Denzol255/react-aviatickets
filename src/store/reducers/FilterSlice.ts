import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// State и reducers для фильтров
interface FilterState {
  sorting: {
    type: string;
  };
  transferFilterOptions: Array<boolean>;
  priceFilter: {
    from: number;
    to: number;
  };
  companyFilter: Array<string>;
}

export const initialState: FilterState = {
  sorting: {
    type: "",
  },
  transferFilterOptions: [false, false],
  priceFilter: {
    from: 0,
    to: 1000000,
  },
  companyFilter: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeSortingType: (state, action: PayloadAction<string>) => {
      state.sorting.type = action.payload;
    },
    changeTransferFilterOptions: (
      state,
      action: PayloadAction<Array<boolean>>
    ) => {
      state.transferFilterOptions = action.payload;
    },
    changePriceFrom: (state, action: PayloadAction<number>) => {
      state.priceFilter.from = action.payload;
    },
    changePriceTo: (state, action: PayloadAction<number>) => {
      state.priceFilter.to = action.payload;
    },
    changeCompanyFilter: (state, action: PayloadAction<Array<string>>) => {
      state.companyFilter = action.payload;
    },
  },
});

export const {
  changeSortingType,
  changeTransferFilterOptions,
  changePriceFrom,
  changePriceTo,
  changeCompanyFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
