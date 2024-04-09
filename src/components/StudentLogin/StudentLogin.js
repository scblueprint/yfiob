import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./StudentLogin.module.css";

function StudentLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Add a useEffect hook to listen for authentication state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log(user);
        setUser(user);
        navigate("/questionPage");
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up the subscription
    return unsubscribe;
  }, [setUser, navigate]); // Empty dependency array ensures that this effect runs only once

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // If successful, user is signed in
        const user = userCredentials.user;
        console.log(`${user.email} is users email`);
        navigate("/questionPage");
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
      });

    // Clear Form Data after submission
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
