import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./StudentLogin.module.css";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // If successful, user is signed in
        const user = userCredentials.user;
        navigate("/questionPage");
        console.log(user);
        // TODO: We still need to implement UI changes if user is logged in
      })
      .catch((error) => {
        // TODO: Handle Logic if user account doesn't exist and other errors
        console.log(error);
      });

    //Clear Form Data after submission
    setEmail("");
    setPassword("");
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
        <Link to="/signup" className={styles.signUpLink}>
          Sign Up!
        </Link>
      </p>
    </div>
  );
}

export default StudentLogin;
