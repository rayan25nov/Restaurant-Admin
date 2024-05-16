import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllProducts = async () => {
    const url = import.meta.env.VITE_API_URL;
    const apiUrl = `${url}/products`;
    const { data: res } = await axios.get(apiUrl);
    // console.log(res.data);
    setProducts(res.data);
    setOriginalProducts(res.data);
  };

  const applyFilters = () => {
    let filtered = originalProducts.filter((item) => {
      const categoryMatch =
        categoryFilter === "" || item.category === categoryFilter;
      const typeMatch = typeFilter === "" || item.type === typeFilter;
      return categoryMatch && typeMatch;
    });
    setProducts(filtered);
  };

  const resetFilters = () => {
    setCategoryFilter("");
    setTypeFilter("");
    setProducts(originalProducts);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = originalProducts.filter((item) =>
      item.caption.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProducts(filtered);
  };

  const handleDelete = async (id) => {
    const JWT_Token = localStorage.getItem("token");
    const url = import.meta.env.VITE_API_URL;
    const apiUrl = `${url}/products/${id}`;
    try {
      const { data: res } = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${JWT_Token}`,
        },
      });
      console.log(res);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className={styles.app_container}>
      <Sidebar />
      <main className={styles.app_content}>
        <header className={styles.app_content_header}>
          <h1 className={styles.app_content_headerText}>Products</h1>
          <Link to={"/add-product"} className={styles.app_content_headerButton}>
            Add Product
          </Link>
        </header>
        <section className={styles.app_content_actions}>
          <input
            className={styles.search_bar}
            placeholder="Search..."
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className={styles.app_content_actions_wrapper}>
            <div className={styles.filter_button_wrapper}>
              <button onClick={applyFilters}>
                <span>Filter</span>
                <img src="./assets/filter.png" alt="Filter" width={"20px"} />
              </button>
              <div className={styles.filter_menu}>
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option disabled value="">
                    All Categories
                  </option>
                  <option value={"mainDish"}>Main Dish</option>
                  <option value={"breakFast"}>BreakFast</option>
                  <option value={"desserts"}>Desserts</option>
                </select>
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option disabled value="">
                    All Types
                  </option>
                  <option value={"veg"}>Vegetarian</option>
                  <option value={"non veg"}>Non vegetarian</option>
                </select>

                <div className={styles.filter_menu_buttons}>
                  <button
                    className={`${styles.filter_button} ${styles.reset}`}
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                  <button
                    className={`${styles.filter_button} ${styles.apply}`}
                    onClick={applyFilters}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className={`${styles.products_area_wrapper} ${styles.tableView}`}
        >
          <div className={styles.products_header}>
            <h4 className={styles.product_cell}>Item</h4>
            <h4 className={styles.product_cell}>Category</h4>
            <h4 className={styles.product_cell}>Type</h4>
            <h4 className={styles.product_cell}>Price</h4>
            <h4 className={styles.product_cell}>Rating</h4>
            <h4 className={styles.product_cell}>Delete</h4>
            <h4 className={styles.product_cell}>Update</h4>
          </div>
          {products.map((product) => (
            <div className={styles.products_row} key={product._id}>
              <div className={styles.product_cell}>
                <img
                  src={product.image}
                  alt="product"
                  className={styles.product_image}
                />
                <span>{product.caption}</span>
              </div>
              <div className={styles.product_cell}>{product.category}</div>
              <div className={styles.product_cell}>{product.type}</div>
              <div className={styles.product_cell}>
                <span>₹</span>
                <span>{product.price}</span>
              </div>
              <div className={styles.product_cell}>
                <span>{product.rating}</span>
              </div>
              <div
                className={styles.product_cell}
                onClick={() => handleDelete(product._id)}
              >
                <img src="./assets/delete.png" alt="delete" width={"25px"} />
              </div>
              <Link
                to={`/update-product/${product._id}`}
                className={styles.product_cell}
              >
                <img src="./assets/update.png" alt="update" width={"25px"} />
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Product;
