import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cartLogo from "../../assets/cart.png";

import styles from "./Products.module.css";

const Products = ({
  addToCart,
  cart,
  products,
  setProducts,
}) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3004/products");
      const jsonResponse = await response.json();
      setProducts(jsonResponse);
  }
  fetchProducts();
  }, [setProducts]);
  
  const searchTextHandler = (event) => {
    setSearchText(event.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3004/products?q=${searchText}`)
      .then((res) => res.json())
      .then((product) => setProducts(product));
  };

  const logoutHandler = () => {
    localStorage.clear();
}

  return (
    <div className={styles.productsContainer}>
      <h2 className={styles.userName}>Welcome, {localStorage.getItem("name")}</h2>
      <Link onClick={logoutHandler} to="/" className={styles.logoutBtn}>
        Logout
      </Link>
      <Link className={styles.cartLogoContainer} to="cart">
        <img className={styles.cartLogo} src={cartLogo} alt="Cart" />
        <span className={styles.cartCount}>{cart.length}</span>
      </Link>
      <div className={styles.productsSection}>
        <h2 className={styles.textOne}>Products</h2>
        <form className={styles.searchForm} onSubmit={searchSubmitHandler}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search Products"
            value={searchText}
            onChange={searchTextHandler}
          />
          <button className={styles.searchBtn} type="submit">
            Search
          </button>
        </form>
        {products.map((product) => {
          return (
            <div className={styles.productBox} key={product.id}>
              <div className={styles.productHead}>
                <div className={styles.productName}>{product.name}</div>
              </div>
              <div className={styles.productBody}>
                <div className={styles.productDescription}>
                  {product.description}
                </div>
                <div className={styles.productPrice}>Rs. {product.price}</div>
                <button
                  className={styles.cartBtn}
                  onClick={addToCart.bind(null, product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;