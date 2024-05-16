import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./StaffLogin.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL;
    const apiUrl = `${url}/staffs/login`;
    const data = { email, password };
    console.log(data);
    try {
      const { data: res } = await axios.post(apiUrl, data);
      console.log(res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.data.accessLevel);
      window.location = `/${res.data.accessLevel}`;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.form_group}>
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
