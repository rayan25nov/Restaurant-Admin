import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Order.module.css";

// Mock data for orders
const mockOrders = {
  user_1: {
    total_orders: 2,
    items_ordered: ["Pizza", "Burger"],
    delivered: false,
  },
  user_2: {
    total_orders: 3,
    items_ordered: ["Icecream", "BBQ", "Fried Fish"],
    delivered: false,
  },
  user_3: {
    total_orders: 1,
    items_ordered: ["Pasta"],
    delivered: true,
  },
  user_4: {
    total_orders: 4,
    items_ordered: ["Pizza", "Burger", "Icecream", "BBQ"],
    delivered: false,
  },
  user_5: {
    total_orders: 2,
    items_ordered: ["Pizza", "Burger"],
    delivered: true,
  },
  user_6: {
    total_orders: 1,
    items_ordered: ["Pasta"],
    delivered: false,
  },
  user_7: {
    total_orders: 3,
    items_ordered: ["Icecream", "BBQ", "Fried Fish"],
    delivered: true,
  },
  user_8: {
    total_orders: 2,
    items_ordered: ["Pizza", "Burger"],
    delivered: false,
  },
  // Add more users and orders as needed
};

const Order = () => {
  const [orders, setOrders] = useState(mockOrders);

  const handleDelivery = (user) => {
    setOrders({
      ...orders,
      [user]: {
        ...orders[user],
        delivered: !orders[user].delivered,
      },
    });
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.order_content}>
        <div className={styles.header}>
          <h2>Orders</h2>
        </div>
        <div className={styles.order_component}>
          {Object.entries(orders).map(([user, orderDetails]) => (
            <div className={styles.user} key={user}>
              <h3>{user}</h3>
              <p>
                <strong>Total Orders:</strong> {orderDetails.total_orders}
              </p>
              <p>
                <strong>Items Ordered:</strong>{" "}
                {orderDetails.items_ordered.join(", ")}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {orderDetails.delivered ? "Delivered" : "Pending"}
              </p>
              <button onClick={() => handleDelivery(user)}>
                Mark as {orderDetails.delivered ? "Pending" : "Delivered"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
