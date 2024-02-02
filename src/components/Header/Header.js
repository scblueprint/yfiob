import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import yfiobLogo from "../../assets/image.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="headerWrapper">
      <img className="yfioblogo" src={yfiobLogo} alt="YFIOB Logo" />

      <Navbar />

      <div className="navContainer">
        <div className="login-container">
          <Link to="/login" className="signIn">
            Sign In
          </Link>

          <div className="adminBtnContainer">
            <Link to="/login" className="admin">
              Admin
            </Link>
            <img
              className="lock"
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

