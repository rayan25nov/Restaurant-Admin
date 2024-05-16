import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import styles from "../chef/Chef.module.css";
import { toast } from "react-toastify";

const Waiter = () => {
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
      <Header role="Waiter" />
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
            ) : order.status == "Started" || order.status == "Pending" ? (
              "Meal not prepared yet"
            ) : order.status !== "Delivered" ? (
              <div>
                <button
                  onClick={() => handleOrderUpdate(order._id, "Delivered")}
                >
                  Delivered
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

export default Waiter;
