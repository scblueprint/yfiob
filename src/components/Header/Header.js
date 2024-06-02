import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import yfiobLogo from "../../assets/image.png";
import styles from "./Header.module.css";
// import { updateUserAssessment } from '../../firebase/uploadResponses'
import { auth } from "../../firebase/firebaseConfig";

const Header = ({ user }) => {
  const navigate = useNavigate();
  // Function to handle sign-out
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className={styles.headerWrapper}>
      <Link to="https://yfiob.org/">
        <img className={styles.yfioblogo} src={yfiobLogo} alt="YFIOB Logo" />
      </Link>

      <Navbar />
      {/* <button className={styles.signOutBtn} onClick={() => updateUserAssessment(user.uid)}>
        Test Upload
      </button> */}

      <div className={styles.navContainer}>
        <div className={styles.loginContainer}>
          {user ? (
            <p className={styles.signIn}>{`Hello, ${user.displayName}`}</p>
          ) : (
            <Link to="/login" className={styles.signIn}>
              Sign In
            </Link>
          )}

          {user ? (
            <button className={styles.signOutBtn} onClick={handleSignOut}>
              {" "}
              Sign Out
            </button>
          ) : (
            <div className={styles.adminBtnContainer}>
              <Link to="/admin" className={styles.admin}>
                Admin
              </Link>
              <img
                className={styles.lock}
                src="https://icongr.am/entypo/lock.svg?size=43&color=000000"
                alt="Lock"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
