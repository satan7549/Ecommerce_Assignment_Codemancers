// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import Products from "../pages/Products";
// import Cart from "../pages/Cart";

// const AllRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/cart" element={<Cart />} />
//     </Routes>
//   );
// };

// export default AllRoutes;

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

import Signup from "../pages/Signup";
// import Products from "../pages/Products";
// import Cart from "../pages/Cart";
import Login from "../pages/Login";
// import ProductList from "../pages/Products";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import Checkout from "../pages/Checkout";

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
      {/* <Route path="/products" element={<Products />} /> */}
      {/* <Route
        path="/cart"
        element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
      /> */}
      {/* <Route
        path="/checkout"
        element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />}
      />  */}
    </Routes>
  );
};

export default AllRoutes;
