import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import yfiobLogo from '../assets/image.png';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
        <div className="nav-container">
          <nav className="navbar">
            <img className="yfioblogo" src={yfiobLogo} alt="YFIOB Logo" />
            <Link to="/" className="takeQuiz">Take Quiz!</Link>
            <Link to="/" className="exploreCareers">Explore Careers</Link>
            <div className="login-container">
              <Link to="/login" className="signIn">Sign In</Link>
              <Link to="/login" className="admin">
                Admin
                <img className="lock" src="https://icongr.am/entypo/lock.svg?size=43&color=000000" alt="Lock" />
              </Link>
            </div>
          </nav>
        </div>
    </div>
  );
};

export default Header;