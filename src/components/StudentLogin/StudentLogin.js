import React, { useState } from "react";
import styles from "./StudentLogin.module.css";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.studentHeader}>Student Log In</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className={styles.loginBtn}>
          Log In!
        </button>
      </form>
      <p className={styles.noAccountText}>
        Don't have an account?{" "}
        <a href="/signup" className={styles.signUpLink}>
          Sign Up!
        </a>
      </p>
    </div>
  );
}

export default StudentLogin;
