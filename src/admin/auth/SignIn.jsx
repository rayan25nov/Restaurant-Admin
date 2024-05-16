import React from "react";
import axios from "axios";
import AuthForm from "./AuthForm.jsx";
import { toast } from "react-toastify";

const SignIn = () => {
  const url = import.meta.env.VITE_API_URL;
  const apiUrl = `${url}/admin/login`;
  const signinHandler = async (username, password) => {
    // console.log(username, password);
    const data = { username, password };
    try {
      const { data: res } = await axios.post(apiUrl, data);
      console.log(res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.data.role);
      window.location = "/";
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return <AuthForm signin signinHandler={signinHandler} />;
};

export default SignIn;
