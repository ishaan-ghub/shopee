import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginuser, setLoginuser] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginuser({ ...loginuser, [name]: value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", loginuser);
      const { data, message, status } = res.data;
      if (data) {
        alert(message);
        localStorage.setItem("userId", data.id)
        navigate("/allproducts")
      }
      else if (!data && status < 500) {
        alert(message);
      }
      else {
        alert(message);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      alert(errMsg);
    };
  };
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={formSubmit} className={styles.loginForm}>
        <h2>Welcome Back</h2>
        <p>Login to continue shopping for fun!</p>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={loginuser.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={loginuser.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.btnGroup}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
