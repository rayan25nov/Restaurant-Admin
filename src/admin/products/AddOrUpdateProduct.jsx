import { toast } from "react-toastify";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./AddProductForm.module.css";

const AddOrUpdateProduct = () => {
  // get Id if there is update
  const { id } = useParams();
  // All the field to add or udate
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [readImg, setReadImg] = useState(null);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [special, setSpecial] = useState(false);
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  // Function to handle the image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setReadImg(reader.result);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  const addOrUpdateHandler = async (e) => {
    e.preventDefault();
    // Create a FormData object to store the form data
    const formData = new FormData();
    formData.append("category", category);
    formData.append("type", type);
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("description", description);
    formData.append("special", special);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("quantity", "1");

    const JWT_Token = localStorage.getItem("token");
    const url = import.meta.env.VITE_API_URL;
    // Set the API URL based on the environment variable
    let apiUrl;
    if (id) {
      apiUrl = `${url}/products/${id}`;
    } else {
      apiUrl = `${url}/products`;
    }
    try {
      // Make the POST or PATCH request according to the API
      if (id) {
        const { data: res } = await axios.patch(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${JWT_Token}`,
          },
        });
        toast.success(res.message);
      } else {
        const { data: res } = await axios.post(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${JWT_Token}`,
          },
        });
        toast.success(res.message);
      }
      setCategory("");
      setType("");
      setImage(null);
      setReadImg(null);
      setCaption("");
      setDescription("");
      setPrice("");
      setRating("");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <form onSubmit={addOrUpdateHandler} className={styles.container}>
      {id && (
        <div className={styles.input_cell}>
          <label htmlFor="id">Id:</label>
          <input type="text" id="id" value={id} disabled />
        </div>
      )}
      <div className={styles.input_cell}>
        <label htmlFor="category">All Categories</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value={"mainDish"}>Main Dish</option>
          <option value={"breakFast"}>BreakFast</option>
          <option value={"desserts"}>Desserts</option>
        </select>
      </div>

      <div className={styles.input_cell}>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Type
          </option>
          <option value={"veg"}>Vegetarian</option>
          <option value={"non veg"}>Non vegetarian</option>
        </select>
      </div>
      <div className={styles.input_cell}>
        <label htmlFor="image">Image</label>
        <div>
          {readImg ? (
            <img src={readImg} alt="Uploaded image" className={styles.image} />
          ) : (
            <p className={styles.text}>No image uploaded</p>
          )}
        </div>
        <input
          type="file"
          id="image"
          required
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <div className={styles.input_cell}>
        <label htmlFor="caption">Caption:</label>
        <input
          type="text"
          id="caption"
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
      </div>
      <div className={styles.input_cell}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className={styles.input_cell}>
        <label htmlFor="special">Special</label>
        <select
          id="special"
          value={special}
          onChange={(e) => setSpecial(e.target.value)}
          required
        >
          <option value="">Select Special</option>
          <option value={false}>False</option>
          <option value={true}>True</option>
        </select>
      </div>
      <div className={styles.input_cell}>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className={styles.input_cell}>
        <label htmlFor="rating">Rating:</label>
        <input
          type="text"
          id="rating"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>

      <div className={styles.input_cell}>
        <label htmlFor="quantity">Quantity:</label>
        <input type="text" id="quantity" name="quantity" value={1} disabled />
      </div>
      <button className={styles.btn} type="submit">
        Add Product
      </button>
    </form>
  );
};

export default AddOrUpdateProduct;
