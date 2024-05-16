import React from "react";
import AuthForm from "./AuthForm.jsx";

const ForgotPassword = () => {
  const forgotPasswordHandler = (Email) => {
    console.log("Email: ", Email);
  };
  return (
    <AuthForm forgotPassword forgotPasswordHandler={forgotPasswordHandler} />
  );
};

export default ForgotPassword;
