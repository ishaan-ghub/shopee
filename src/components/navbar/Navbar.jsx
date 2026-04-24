import React, { Fragment } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { SiShopee } from "react-icons/si";
import axios from "axios";

const Navbar = () => {
  let user_id = localStorage.getItem("userId");
  console.log(user_id);

  let navigate = useNavigate();

  let logout = async () => {
    try {
      let user = await axios.post("/api/logout");
      console.log(user.data);
      localStorage.removeItem("userId");
      alert(user.data.message)
      navigate("/");
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      alert(errMsg);
    }
  };

  return (
    <nav className={styles.navbar}>
      <figure className={styles.logo}>
        <SiShopee />
        <span>Shopee</span>
      </figure>

      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>

        {user_id ? (
          <li onClick={logout}> logout</li>
        ) : (
          <Fragment>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Signup
              </NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
