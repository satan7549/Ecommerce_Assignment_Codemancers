import api from "../../utils/axios-service";
import { AppDispatch } from "../store";
import {
  fetchProductsLoading,
  fetchProductsSuccess,
  fetchProductsFail,
  Product,
  adminAddProduct,
  adminUpdateProduct,
//   adminDeleteProduct,
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

// Admin action to add a product
export const adminAddProductAction =
  (product: Product) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("/product", product);
      dispatch(adminAddProduct(response.data));
    } catch (error: any) {
      // Handle error
    }
  };

// Admin action to update a product
export const adminUpdateProductAction =
  (product: Product) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.put(`/product/${product.id}`, product); // Adjust endpoint as needed
      dispatch(adminUpdateProduct(response.data));
    } catch (error: any) {
      // Handle error
    }
  };

// // Admin action to delete a product
// export const adminDeleteProductAction =
//   (productId: string) => async (dispatch: AppDispatch) => {
//     try {
//       await api.delete(`/admin/product/${productId}`); // Adjust endpoint as needed
//       dispatch(adminDeleteProduct(productId));
//     } catch (error: any) {
//       // Handle error
//     }
//   };
