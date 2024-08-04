import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckoutState {
  loading: boolean;
  checkoutData: any; 
  error: any;
}

const initialState: CheckoutState = {
  loading: false,
  checkoutData: null,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    checkoutLoading(state) {
      state.loading = true;
    },
    checkoutSuccess(state, action: PayloadAction<{ checkoutData: any }>) {
      state.loading = false;
      state.checkoutData = action.payload.checkoutData;
    },
    checkoutFail(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { checkoutLoading, checkoutSuccess, checkoutFail } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
