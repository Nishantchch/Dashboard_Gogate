import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  filterProduct: {},
};
const productSlice = createSlice({
  name: "productState",  initialState,
  reducers: {
    setFilterProduct: (state, action) => {
      state.filterProduct = action.payload;
    },
  },
});

export const { setFilterProduct } = productSlice.actions;
export default productSlice.reducer;
