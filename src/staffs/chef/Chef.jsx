import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import styles from "./Chef.module.css";
// import toast
import { toast } from "react-toastify";

const Chef = () => {
  const [orders, setOrders] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const fetchOrders = async () => {
    try {
      const apiUrl = `${url}/orders/all-orders`;
      const { data: res } = await axios.get(apiUrl);
      // console.log(res);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
      setOrders([]);
    }
  };

  const startPreparingMeal = async (orderId) => {
    try {
      const apiUrl = `${url}/orders/${orderId}`;
      await axios.put(
        apiUrl,
        { status: "Started" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Meal preparation started");
      setTimeout(() => {
        handleOrderUpdate(orderId, "Delivered");
      }, 60 * 1000); // 1 minutes
    } catch (error) {
      console.error("Error starting meal preparation", error);
      toast.error("Error starting meal preparation");
    }
  };

  const handleOrderUpdate = async (orderId, status) => {
    try {
      const apiUrl = `${url}/orders/${orderId}`;
      await axios.put(
        apiUrl,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Order ${status}`);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status", error);
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={styles.chef_container}>
      <Header role="Chef" />
      {!orders || orders.length === 0 ? <p>No orders found</p> : null}
      <ul className={styles.orders}>
        {orders.map((order) => (
          <li key={order._id} className={styles.order}>
            <p>Order ID: {order._id}</p>
            <p>Total Money: {order.totalMoney}</p>
            <p>Status: {order.status}</p>
            <p>Payment Status: {order.paymentStatus}</p>
            {order.paymentStatus === "Not Paid" ? (
              "Payment not Done"
            ) : order.status !== "Delivered" ? (
              <div>
                <button onClick={() => startPreparingMeal(order._id)}>
                  Start Preparing Meal
                </button>
                <button onClick={() => handleOrderUpdate(order._id, "Ready")}>
                  Mark as Ready
                </button>
                <button
                  onClick={() => handleOrderUpdate(order._id, "Cancelled")}
                >
                  Cancel
                </button>
              </div>
            ) : (
              "Order Delived Successfully"
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chef;
