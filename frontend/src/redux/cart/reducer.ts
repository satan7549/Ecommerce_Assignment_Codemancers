import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddToCartItem, CartItem, CartState } from "./interface";

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLoading(state) {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess(state, action: PayloadAction<AddToCartItem>) {
      state.loading = false;
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.items[itemIndex].count += action.payload.count;
      } else {
        state.items.push({
          id: action.payload.id,
          product: {
            id: action.payload.id,
            title: "",
            description: "",
            price: 0,
            image: "",
          },
          count: action.payload.count,
        });
      }
    },
    addToCartFail(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCartLoading(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess(state, action: PayloadAction<CartItem[]>) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchCartFail(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.error = action.payload;
    },

    removeFromCartSuccess(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    removeFromCartFail(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCartLoading,
  addToCartSuccess,
  addToCartFail,
  fetchCartLoading,
  fetchCartSuccess,
  fetchCartFail,
  removeFromCartSuccess,
  removeFromCartFail,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
