import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import yfiobLogo from '../assets/image.png';
import lock from '../assets/lock.png'
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <Router>
        <div className="nav-container">
          <nav className="navbar">
            <img className="yfioblogo" src={yfiobLogo} alt="YFIOB Logo" />
            <Link to="/" className="takeQuiz">Take Quiz!</Link>
            <Link to="/" className="exploreCareers">Explore Careers</Link>
            <div className="login-container">
              <button className="signIn">Sign In</button>
              <button className="admin">
                Admin
                <img className="lock" src="https://icongr.am/entypo/lock.svg?size=43&color=000000" alt="Lock" />
              </button>
            </div>
          </nav>
        </div>
      </Router>
    </div>
  );
};

export default Header;