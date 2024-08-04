import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://ecommerce-assignment-codemancers-backnd.onrender.com",
  //   baseURL: "http://localhost:8080",
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
