import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "./Register.module.css";


const Register = () => {
  const [userData, setUserData] = useState({ email: "", password: "", name: "" });
  const history = useHistory();

  const inputChangeHandler = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const jsonResponse = await response.json();
    localStorage.setItem("token", jsonResponse.accessToken);
    localStorage.setItem("name", userData.name);
    const token = localStorage.getItem("token");
    if(token && token===jsonResponse.accessToken){
        history.push("/products");
    }
  };
  return (
    <div className={styles.authContainer}>
      <form className={styles.signupForm} onSubmit={formSubmitHandler}>
        <h2 className={styles.textOne}>Register</h2>
        <input className={styles.input} type="text" placeholder="Your Name" name="name" value={userData.name} onChange={inputChangeHandler} autoComplete="false"/>
        <input
          className={styles.input}
          type="email"
          placeholder="E-mail"
          name="email"
          value={userData.email}
          onChange={inputChangeHandler}
          autoComplete="false"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={inputChangeHandler}
          autoComplete="false"
        />
        <button className={styles.signupBtn} type="submit">
          Signup
        </button>
        <Link className={styles.authChange} to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default Register;