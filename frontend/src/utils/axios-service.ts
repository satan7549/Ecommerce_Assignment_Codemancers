import axios from "axios";

export const baseURL = "https://ecommerce-assignment-codemancers-backnd.onrender.com";

// export const baseURL = "http://localhost:8080";

// Create an Axios instance
const api = axios.create({
  baseURL,
});

// Interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
