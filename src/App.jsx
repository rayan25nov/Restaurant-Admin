import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import SignIn from "./admin/auth/SignIn.jsx";
import SignUp from "./admin/auth/SignUp.jsx";
import ForgotPassword from "./admin/auth/ForgotPassword.jsx";
import Home from "./admin/home/Home.jsx";
import Product from "./admin/products/Product.jsx";
import Order from "./admin/orders/Order.jsx";
import AddOrUpdateProduct from "./admin/products/AddOrUpdateProduct.jsx";
import ManageTeam from "./admin/team/ManageTeam.jsx";
import AddOrUpdateStaff from "./admin/team/AddOrUpdateStaff.jsx";
import StaffLogin from "./staffs/auth/StaffLogin.jsx";
import Staff from "./staffs/staff/Staff.jsx";
import Chef from "./staffs/chef/Chef.jsx";
import Accountant from "./staffs/accountant/Accountant.jsx";
import Waiter from "./staffs/waiter/Waiter.jsx";

const App = () => {
  const JWT_TOKEN = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isTokenExpired = async () => {
    if (JWT_TOKEN) {
      try {
        const url = import.meta.env.VITE_API_URL;
        const apiUrl = `${url}/checkTokenExpiration`;
        const { data: res } = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        });
        if (res.expired) {
          localStorage.removeItem("token");
          window.location = "/login";
          return;
        }
      } catch (err) {
        // Handle error
        // console.error("Error checking token expiration:", err);
        localStorage.removeItem("token");
        window.location = "/login";
        return;
      }
    }
  };

  useEffect(() => {
    isTokenExpired();
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {JWT_TOKEN && role === "admin" ? (
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
          ) : JWT_TOKEN ? (
            <>
              {role === "chef" ? (
                <Route path="/chef" element={<Chef />} />
              ) : role === "accountant" ? (
                <Route path="/accountant" element={<Accountant />} />
              ) : role === "waiter" ? (
                <Route path="/waiter" element={<Waiter />} />
              ) : (
                <Route path="/staff" element={<Staff />} />
              )}
            </>
          ) : (
            <>
              <Route path="/login" exact element={<SignIn />} />
              {/* Use the Navigate component to redirect to the login page */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route
                path="/forgotPassword"
                exact
                element={<ForgotPassword />}
              />
              <Route path="/staff/login" exact element={<StaffLogin />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default App;
