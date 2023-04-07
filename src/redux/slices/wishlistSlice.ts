import { createSlice } from "@reduxjs/toolkit";

let initialState: any = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    remove: (state, action) => {
      let items = state.items;
      let filteredItems = items.filter(
        (item: number) => item !== action.payload
      );
      state.items = [...filteredItems];
    },
  },
});

export const { add, remove } = wishlistSlice.actions;

export default wishlistSlice.reducer;
