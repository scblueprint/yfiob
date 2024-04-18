import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import yfiobLogo from "../../assets/image.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <Link to="/">
        <img className={styles.yfioblogo} src={yfiobLogo} alt="YFIOB Logo" />
      </Link>

      <Navbar />

      <div className={styles.navContainer}>
        <div className={styles.loginContainer}>
          <Link to="/login" className={styles.signIn}>
            Sign In
          </Link>

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
