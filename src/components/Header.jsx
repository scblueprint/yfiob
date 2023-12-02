// Header.jsx
import React from 'react';
import './Header.css'; 
import { BrowserRouter as Router, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Router>
        <div className="nav-container">
          <nav className="navbar">
            <img className="yfioblogo" src="image.png" alt="YFIOB Logo" /> 
            <Link to="/" className="takeQuiz">Take Quiz!</Link>
            <Link to="/" className="exploreCareers">Explore Careers</Link>
            <button className="signIn">Sign In</button>
            <button className="admin">Admin<img className="lock" src="lock.png" alt="Lock" /></button>
          </nav>
        </div>
        <div className="title-container">
          <p className="title">What Careers Can You Explore?</p>
        </div>
        <body>
          <div className="whiteSquare">
            <p className="text">Let us help find how your interests can relate to different fields of work! Take this quiz to help give you ideas on what your career search can look like.</p>
          </div>
        </body>
      </Router>
    </header>
  );
}

export default Header;