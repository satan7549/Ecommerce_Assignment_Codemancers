import api from "../../utils/axios-service";
import { AppDispatch } from "../store";
import {
  fetchProductsLoading,
  fetchProductsSuccess,
  fetchProductsFail,
} from "./reducer";

export const fetchProducts = () => async (dispatch: AppDispatch) => {
  dispatch(fetchProductsLoading());
  try {
    const response = await api.get("/product");
    const transformedData = response.data.data.map((product: any) => ({
      id: product._id,
      image: product.image,
      title: product.title,
      description: product.description,
      price: product.price,
    }));
    dispatch(fetchProductsSuccess(transformedData));
  } catch (error: any) {
    dispatch(
      fetchProductsFail(error.response?.data?.message || "An error occurred")
    );
  }
};
