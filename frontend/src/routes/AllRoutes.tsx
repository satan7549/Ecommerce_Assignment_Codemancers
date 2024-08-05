import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductManagement from "../components/ProductManagement";
import { UserRole } from "../types/user";

const AllRoutes = () => {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/cart"
        element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
      />
      <Route
        path="/checkout"
        element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />}
      />

      {isAuthenticated && role === UserRole.SUPER_ADMIN && (
        <Route path="/admin/products" element={<ProductManagement />} />
      )}
    </Routes>
  );
};

export default AllRoutes;
