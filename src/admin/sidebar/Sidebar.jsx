import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      const JWT_TOKEN = localStorage.getItem("token");
      if (!JWT_TOKEN) {
        return;
      }
      const url = import.meta.env.VITE_API_URL;
      const apiUrl = `${url}/admin/logout`;
      await axios.get(apiUrl);
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.sticky_sidebar_container}>
      <aside className={styles.sidebar}>
        <ul className={styles.sidebar_list}>
          <Link to={"/"} className={styles.link}>
            <li
              className={`${styles.sidebar_list_item} ${
                location.pathname === "/" ? styles.active : ""
              }`}
            >
              <img src="./assets/home.png" alt="Home" />
              <span>Home</span>
            </li>
          </Link>
          <Link to={"/products"} className={styles.link}>
            <li
              className={`${styles.sidebar_list_item} ${
                location.pathname === "/products" ? styles.active : ""
              }`}
            >
              <img src="./assets/bag.png" alt="Products" />
              <span>Products</span>
            </li>
          </Link>
          <Link to={"/orders"} className={styles.link}>
            <li
              className={`${styles.sidebar_list_item} ${
                location.pathname === "/orders" ? styles.active : ""
              }`}
            >
              <img src="./assets/order.png" alt="Orders" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to={"/manage-team"} className={styles.link}>
            <li
              className={`${styles.sidebar_list_item} ${
                location.pathname === "/manage-team" ? styles.active : ""
              }`}
            >
              <img src="./assets/business.png" alt="Teams" />
              <span>Manage Teams</span>
            </li>
          </Link>
          <Link className={styles.link} onClick={handleLogout}>
            <li className={styles.sidebar_list_item}>
              <img src="./assets/shutdown.png" alt="Logout" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
        <div className={styles.account_info}>
          <div className={styles.account_info_picture}>
            <img src="./assets/rayan.jpeg" alt="Account" />
          </div>
          <h4 className={styles.account_info_name}>Rayan A.</h4>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
