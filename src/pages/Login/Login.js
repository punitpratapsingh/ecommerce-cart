import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './Login.module.css';

const Login = () => {
    const [userData, setUserData] = useState({email: '', password: ''});
    const history = useHistory();

    const inputChangeHandler = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:3000/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: userData.email,
              password: userData.password
          })
        });
        const jsonResponse = await response.json();
        localStorage.setItem("token", jsonResponse.accessToken);
        const token = localStorage.getItem("token");

        const usersResponse = await fetch("http://localhost:3000/users");
        const users = await usersResponse.json();
        let name;
        for (const user of users) {
            if(user.email === userData.email){
                name = user.name;
            }
        }
        localStorage.setItem("name", name);
        if(token && token===jsonResponse.accessToken){
            history.push("/products");
        }
    }
    return (
        <div className={styles.authContainer}>
            <form className={styles.loginForm} onSubmit={formSubmitHandler}>
                <h2 className={styles.textOne}>Login</h2>
                <input className={styles.input} type="email" placeholder="E-mail" name="email" value={userData.email} onChange={inputChangeHandler} autoComplete="false"/>
                <input className={styles.input} type="password" placeholder="Password" name="password" value={userData.password} onChange={inputChangeHandler} autoComplete="false"/>
                <button className={styles.loginBtn} type="submit">Login</button>
                <Link className={styles.authChange} to="/register">Don't have an account? Register</Link>
            </form>
        </div>
    );
};

export default Login;