import axios from "axios";
import { AppDispatch } from "../store";
import {
  loginLoading,
  loginSuccess,
  loginFail,
  signupLoading,
  signupSuccess,
  signupFail,
} from "./reducer";
import { baseURL } from "../../utils/axios-service";

export const login =
  (loginDetails: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(loginLoading());
    dispatch(loginFail(null));
    try {
      const response = await axios.post(`${baseURL}/user/login`, loginDetails);
      dispatch(loginSuccess(response.data));

      // Store token in local storage
      localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      dispatch(loginFail(error.response.data.message));
    }
  };

export const signup =
  (signupDetails: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(signupLoading());
    dispatch(signupFail(null));
    try {
      const response = await axios.post(
        `${baseURL}/user/register`,
        signupDetails
      );
      console.log("response:-", response);
      dispatch(signupSuccess(response.data));
      // Store token in local storage
      localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      dispatch(signupFail(error.response.data.message));
    }
  };
