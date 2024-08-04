import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/reducer";
import productReducer from "./product/reducer";
import cartReducer from "./cart/reducer";
// import checkoutReducer from "./checkout/reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    // checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
