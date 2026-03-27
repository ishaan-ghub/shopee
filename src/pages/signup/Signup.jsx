import { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";

const Signup = () => {
  const [signupuser, setSignupuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupuser({ ...signupuser, [name]: value });
    console.log(signupuser);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      let resp = await axios.post("/api/signup", signupuser);
      const { data, message, status } = resp.data;
      if (data) {
        localStorage.setItem("userId",data.id)
        alert(message);
      }
      else if (!data && status<500) {
        alert(message);
      }
      setSignupuser({ name: "", email: "", password: "" }); // clear inputs
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      alert(errMsg);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={formSubmit} className={styles.signupForm}>
        <h2>Create Your Account</h2>
        <p>Join us and start shopping for fun!</p>
        <div className={styles.formGroup}>
          <label>Full name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            name="name"
            value={signupuser.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={signupuser.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={signupuser.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.btnGroup}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
