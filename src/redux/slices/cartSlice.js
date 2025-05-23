import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }

      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },
    removeItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        }
      }

      state.totalPrice = state.items.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },

    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cartSlice;
export const selectcartItemById = (id) => (state) =>
  state.cartSlice.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
