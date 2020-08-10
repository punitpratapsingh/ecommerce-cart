import React from "react";

import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.textOne}>Welcome</h1>
      <h2 className={styles.textTwo}>
        Login/Signup to see Products
      </h2>
      <div className={styles.linksContainer}>
        <Link className={styles.authLink} to="/login">
          Login
        </Link>
        <Link className={styles.authLink} to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
