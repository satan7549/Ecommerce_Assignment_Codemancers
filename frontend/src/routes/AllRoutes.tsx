import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

const AllRoutes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
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
    </Routes>
  );
};

export default AllRoutes;
