import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./StudentLogin.module.css";
import closeIcon from "../../assets/closeIcon.png";

function StudentLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setInputError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setInputError(false);
  };

  // Listen for authentication state changes
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
  }, [setUser, navigate]);
  const closePopup = () => {
    setShowPopup(false);
    setInputError(false);
    // Clear the fields when the popup is closed
    setEmail("");
    setPassword("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        // If successful, user is signed in
        const user = userCredentials.user;
        console.log(`${user.email} is users email`);
        navigate("/questionPage");
      })
      .catch((error) => {
        // Handle errors
        setInputError(true);
        setErrorMessage("Incorrect login information.\nPlease make sure you entered the correct username and password.");
        console.error(errorMessage);
      setShowPopup(true); // Show the popup when there is an error
      });

    // Clear Form Data after submission
    
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
            className={inputError ? styles.inputError : ''}
          />
          {inputError && <div className={styles.errorIcon} />}
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
            className={inputError ? styles.inputError : ''}
          />
          {inputError && <div className={styles.errorIcon} />}
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
      {showPopup && ( // This is where the popup component is conditionally rendered
      <div className={styles.popupOverlay}>
        <div className={styles.popup}>
          <p>Incorrect login information.<br/>Please make sure you entered the correct username and password.</p>
          <button className = {styles.closeIcon} onClick={closePopup}>
            <img src={closeIcon} alt="lol"></img>
          </button>
        </div>
      </div>
    )}
    </div>
  );
}

export default StudentLogin;
