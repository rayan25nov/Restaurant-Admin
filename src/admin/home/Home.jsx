import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";
import styles from "./Home.module.css";
import Sidebar from "../sidebar/Sidebar";

// Dummy data for the charts
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const sales = days.map((day) => ({
  name: day,
  value: getRandomInt(1000, 5000),
}));
const orders = days.map((day) => ({
  name: day,
  count: getRandomInt(5, 30),
}));
const data = { sales, orders };

// Dummy data for top selling products
const topSellingProducts = [
  { name: "Pizza", value: 240 },
  { name: "Burger", value: 130 },
  { name: "Salad", value: 80 },
  { name: "Pasta", value: 50 },
  { name: "Drink", value: 60 },
];

// Colors for each slice of the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Home = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.home_dashboard}>
        <h1 className={styles.header}>Dashboard</h1>
        <div className={styles.summary}>
          <h2>Today's Summary</h2>
          {/* Summary components here */}
        </div>
        <div className={styles.charts}>
          <div className={styles.sales_chart}>
            <h2>Sales</h2>
            <BarChart width={500} height={300} data={data.sales}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#ccc" />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
          <div className={styles.orders_chart}>
            <h2>Orders</h2>
            <LineChart width={500} height={300} data={data.orders}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#ccc" />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </div>
          {/* Additional charts like PieChart for order types can be added here */}
          <div className={styles.top_selling_chart}>
            <h2>Top Selling Products</h2>
            <PieChart width={600} height={400} >
              <Pie
                data={topSellingProducts}
                cx={300}
                cy={200}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {topSellingProducts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
