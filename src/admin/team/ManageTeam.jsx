import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import styles from "./ManageTeam.module.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ManageTeam = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const JWT_Token = localStorage.getItem("token");
      const url = import.meta.env.VITE_API_URL;
      const apiUrl = `${url}/staffs`;
      const { data: res } = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${JWT_Token}`,
        },
      });
      setStaff(res.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const removeStaff = async (id) => {
    try {
      const JWT_Token = localStorage.getItem("token");
      const url = import.meta.env.VITE_API_URL;
      const apiUrl = `${url}/staffs/${id}`;
      const { data: res } = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${JWT_Token}`,
        },
      });
      console.log(res);
      toast.success(res.message);
      fetchStaff();
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error removing staff:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.manage_team_content}>
        <h2>Manage Team</h2>
        <Link to={"/add-staff"} className={styles.create_staff}>
          Add Staff
        </Link>
        <div className={styles.staff_list_header}>
          <span>Name</span>
          <span>Age</span>
          <span>Phone Number</span>
          <span>Email</span>
          <span>Access Level</span>
          <span>Delete</span>
          <span>Update</span>
        </div>
        <ul className={styles.staff_list}>
          {staff.length === 0 && <p>No staff members found.</p>}
          {staff.map((staffMember) => (
            <li key={staffMember._id}>
              <span>{staffMember.name}</span>
              <span>{staffMember.age}</span>
              <span>{staffMember.phoneNumber}</span>
              <span>{staffMember.email}</span>
              <span>{staffMember.accessLevel}</span>
              <button onClick={() => removeStaff(staffMember._id)}>
                Remove
              </button>
              <Link to={`/update-staff/${staffMember._id}`}>
                <button className={styles.update_btn}>Update</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageTeam;
