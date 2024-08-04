import { AppDispatch } from "../store";
import api from "../../utils/axios-service";
import { checkoutLoading, checkoutSuccess, checkoutFail } from "./reducer";

export const confirmOrder =
  (addressData: string) => async (dispatch: AppDispatch) => {
    dispatch(checkoutLoading());
    try {
      console.log("before axios");
      const response = await api.post("/cart/checkout", {
        shippingAddress: addressData,
      });
      console.log("after axios", response.data);

      dispatch(checkoutSuccess({ checkoutData: response.data }));
    } catch (error: any) {
      dispatch(
        checkoutFail(error.response?.data?.message || "An error occurred")
      );
    }
  };
