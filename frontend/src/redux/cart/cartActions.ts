import { AppDispatch } from "../store";
import api from "../../utils/axios-service";
import {
  addToCartLoading,
  addToCartSuccess,
  addToCartFail,
  fetchCartLoading,
  fetchCartSuccess,
  fetchCartFail,
} from "./reducer";
import { AddToCartItem } from "./interface";

export const addToCart =
  (item: AddToCartItem) => async (dispatch: AppDispatch) => {
    dispatch(addToCartLoading());
    try {
      await api.post("/cart/add", {
        productId: item.id,
        quantity: item.count,
      });
      dispatch(addToCartSuccess(item));
    } catch (error: any) {
      dispatch(
        addToCartFail(error.response?.data?.message || "An error occurred")
      );
    }
  };

export const fetchCart = () => async (dispatch: AppDispatch) => {
  dispatch(fetchCartLoading());
  try {
    const response = await api.get("/cart");
    const transformedItems = response.data.data.items.map((item: any) => ({
      id: item._id,
      product: {
        id: item.product._id,
        title: item.product.title,
        description: item.product.description,
        price: item.product.price,
        image: item.product.image,
      },
      count: item.quantity,
    }));
    dispatch(fetchCartSuccess(transformedItems));
  } catch (error: any) {
    dispatch(
      fetchCartFail(error.response?.data?.message || "An error occurred")
    );
  }
};
