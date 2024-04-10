import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import yfiobLogo from "../../assets/image.png";
import styles from "./Header.module.css";

const Header = ({ user }) => {
  return (
    <div className={styles.headerWrapper}>
      <img className={styles.yfioblogo} src={yfiobLogo} alt="YFIOB Logo" />

      <Navbar />

      <div className={styles.navContainer}>
        <div className={styles.loginContainer}>
          {user ? (
            <p className={styles.signIn}>{`Hello, ${user.displayName}`}</p>
          ) : (
            <Link to="/login" className={styles.signIn}>
              Sign In
            </Link>
          )}

          <div className={styles.adminBtnContainer}>
            <Link to="/login" className={styles.admin}>
              Admin
            </Link>
            <img
              className={styles.lock}
              src="https://icongr.am/entypo/lock.svg?size=43&color=000000"
              alt="Lock"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
