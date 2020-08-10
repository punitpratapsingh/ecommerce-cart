import React from "react";
import { Link } from "react-router-dom";
import cart from "../../assets/cart.png";
import arrow from "../../assets/arrow.png";
import styles from "./Cart.module.css";

const Cart = ({ products, deleteFromCart }) => {
  return (
    <div className={styles.cart}>
      <Link to="/products" className={styles.backArrow}><img src={arrow} alt="Back" className={styles.arrowImage}/></Link><hr/>
      <h2 className={styles.heading}>My Cart</h2><hr/>
      <div className={styles.cartLogoContainer}>
        <img className={styles.cartLogo} src={cart} alt="Cart" />
        <span className={styles.cartCount}>{products.length}</span>
      </div>
      <div
        className={styles.cartSection}
      >
        {products &&
          products.map((product) => {
            return (
              <div key={product.id} className={styles.cartContainer}>
                <div className={styles.cartProductName}>{product.name}</div>
                <div className={styles.cartProductPrice}>Rs. {product.price}</div>
                <button className={styles.cartDeleteBtn} onClick={deleteFromCart.bind(null, product.id)}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Cart;