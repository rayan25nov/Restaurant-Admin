import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import SignIn from "./auth/SignIn.jsx";
import SignUp from "./auth/SignUp.jsx";
import ForgotPassword from "./auth/ForgotPassword.jsx";
import Home from "./admin/home/Home.jsx";
import Product from "./admin/products/Product.jsx";
import Order from "./admin/orders/Order.jsx";
import AddOrUpdateProduct from "./admin/products/AddOrUpdateProduct.jsx";
import ManageTeam from "./admin/team/ManageTeam.jsx";
import AddOrUpdateStaff from "./admin/team/AddOrUpdateStaff.jsx";
const App = () => {
  const JWT_TOKEN = localStorage.getItem("token");
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {JWT_TOKEN ? (
            <>
              <Route path="/" exact element={<Home />} />
              <Route path="/products" element={<Product />} />
              <Route path="/add-product" element={<AddOrUpdateProduct />} />
              <Route
                path="/update-product/:id"
                element={<AddOrUpdateProduct />}
              />
              <Route path="/orders" element={<Order />} />
              <Route path="/manage-team" element={<ManageTeam />} />
              <Route path="/add-staff" element={<AddOrUpdateStaff />} />
              <Route path="/update-staff/:id" element={<AddOrUpdateStaff />} />
            </>
          ) : (
            <>
              <Route path="/login" exact element={<SignIn />} />
              <Route path="/" element={<Navigate replace to="/login" />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route
                path="/forgotPassword"
                exact
                element={<ForgotPassword />}
              />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default App;
