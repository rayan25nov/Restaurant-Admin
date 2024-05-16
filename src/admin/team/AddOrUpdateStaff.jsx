import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import styles from "./AddOrUpdateStaff.module.css";

const AddOrUpdateStaff = () => {
  // get Id if there is update
  const { id } = useParams();
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffAge, setNewStaffAge] = useState("");
  const [newStaffPhoneNumber, setNewStaffPhoneNumber] = useState("");
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffAccessLevel, setNewStaffAccessLevel] = useState("");
  const [password, setNewPassword] = useState("");

  const addStaffHandler = async (e) => {
    e.preventDefault();
    const JWT_Token = localStorage.getItem("token");
    const url = import.meta.env.VITE_API_URL;
    const data = {
      name: newStaffName,
      age: newStaffAge,
      phoneNumber: newStaffPhoneNumber,
      email: newStaffEmail,
      accessLevel: newStaffAccessLevel,
      password: password,
    };
    // Set the API URL based on the environment variable
    let apiUrl;
    if (id) {
      apiUrl = `${url}/staffs/${id}`;
    } else {
      apiUrl = `${url}/staffs`;
    }
    try {
      if (id) {
        const { data: res } = await axios.patch(apiUrl, data, {
          headers: {
            Authorization: `Bearer ${JWT_Token}`,
          },
        });
        toast.success(res.message);
      } else {
        const { data: res } = await axios.post(apiUrl, data, {
          headers: {
            Authorization: `Bearer ${JWT_Token}`,
          },
        });
        toast.success(res.message);
      }
      setNewStaffName("");
      setNewStaffAge("");
      setNewStaffPhoneNumber("");
      setNewStaffEmail("");
      setNewStaffAccessLevel("");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error adding staff:", error);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.create_staff} onSubmit={addStaffHandler}>
        {id && <input type="text" value={id} disabled />}
        <input
          type="text"
          placeholder="Enter staff name"
          value={newStaffName}
          onChange={(e) => setNewStaffName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter staff age"
          value={newStaffAge}
          onChange={(e) => setNewStaffAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter staff phone number"
          value={newStaffPhoneNumber}
          onChange={(e) => setNewStaffPhoneNumber(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter staff email"
          value={newStaffEmail}
          onChange={(e) => setNewStaffEmail(e.target.value)}
        />
        <select
          name="access level"
          id="acess"
          value={newStaffAccessLevel}
          onChange={(e) => setNewStaffAccessLevel(e.target.value)}
        >
          <option disabled value="">
            Select Access Level
          </option>
          <option value="staff">Staff</option>
          <option value="accountant">Accountant</option>
          <option value="waiter">Waiter</option>
          <option value="chef">Chef</option>
        </select>
        <input
          type="text"
          placeholder="Enter staff password"
          value={password}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
};

export default AddOrUpdateStaff;
