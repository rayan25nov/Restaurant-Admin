import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Header.module.css";

const Header = (props) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const JWT_TOKEN = localStorage.getItem("token");
      if (!JWT_TOKEN) {
        return;
      }
      const url = import.meta.env.VITE_API_URL;
      const apiUrl = `${url}/staffs/logout`;
      await axios.post(apiUrl);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/staff/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.header}>
      <h1>{props.role} Dashboard</h1>
      <form className={styles.button_container} onClick={handleLogout}>
        <img src="./assets/shutdown.png" alt="Logout" />
        <span>Logout</span>
      </form>
    </div>
  );
};

export default Header;
