// AccountantComponent.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import styles from "./Accountant.module.css";

const Accountant = () => {
  const [orders, setOrders] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  const fetchOrders = async (req, res) => {
    try {
      const apiUrl = `${url}/orders`;
      const { data: res } = await axios.get(apiUrl);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
      setOrders([]);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={styles.container}>
      <Header role = "Accountant"/>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total Bill</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>
                {order.items.map((item) => (
                  <p key={item._id}>
                    {item.name} - ${item.price}
                  </p>
                ))}
              </td>
              <td>${order.total}</td>
              <td>{order.isPaid ? "Paid" : "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accountant;
