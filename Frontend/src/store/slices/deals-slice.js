import { createSlice } from "@reduxjs/toolkit";

const dealsSlice = createSlice({
  name: "deal-slice",
  initialState: {
    selectedDeal: {},
  },
  reducers: {
    addToDeal: (state, action) => {
      const { position, data, index } = action.payload;
      state.selectedDeal[index] = {
        ...state.selectedDeal[index],
        [position]: data,
      };
    },
    clearSelectedDeal: (state) => {
      if (state.selectedDeal) state.selectedDeal = {};
    },
  },
});

export const dealsActions = dealsSlice.actions;

export default dealsSlice.reducer;
