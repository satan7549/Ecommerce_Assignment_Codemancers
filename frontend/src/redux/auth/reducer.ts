import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/user";

const initialState: AuthState = {
  loading: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginLoading(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess(state, action: PayloadAction<{ user: any; token: any }>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.user.role);
    },
    loginFail(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    signupLoading(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    signupSuccess(state, action: PayloadAction<{ user: any; token: any }>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role; // Set role from signup response

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.user.role);
    },
    signupFail(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const {
  loginLoading,
  loginSuccess,
  loginFail,
  logout,
  signupFail,
  signupLoading,
  signupSuccess,
} = authSlice.actions;

export default authSlice.reducer;
