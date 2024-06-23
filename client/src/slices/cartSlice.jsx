import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  cart: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // State: existing data, action: incoming new data
    // ADD TO CART
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.slug === action.payload.slug
      );
      // if item exist
      if (!existingItem) {
        state.cart.push({
          ...action.payload,
          addedTime: moment().format("lll"),
        });
        state.quantity++;
      }
    },
    // REMOVE FROM CART
    removeFromCart: (state, action) => {
      const nonRemovableItem = state.cart.filter(
        (item) => item.slug !== action.payload
      );
      state.quantity = nonRemovableItem.length;
      state.cart = nonRemovableItem;
    },
    // REMOVE ALL FROM CART
    removeAll: (state) => {
      state.cart = [];
      state.quantity = 0;
    },
  },
});

export const { addToCart, removeAll, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;