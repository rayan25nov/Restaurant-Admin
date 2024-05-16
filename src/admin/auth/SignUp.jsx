import React from "react";
import AuthForm from "./AuthForm";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const signupHandler = async (Name, Email, Password) => {
    const url = import.meta.env.VITE_API_URL;
    const apiUrl = `${url}/admin/register`;
    const data = { name: Name, username: Email, password: Password };
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

  return <AuthForm signup signupHandler={signupHandler} />;
};

export default SignUp;
