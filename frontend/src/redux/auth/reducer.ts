import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: any;
  token: string | null;
  error: any;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: null,
  token: null,
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
    },
    signupFail(state, action: PayloadAction<string | null>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
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
