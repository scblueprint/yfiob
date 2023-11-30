// Header.js
import React from 'react';
import YFIOB_logo from './YFIOBlogo.svg';
import './Header.css'; 

function Header() {
  return (
    <header className="header">
      <div className="branding">
      <img src={YFIOB_logo}  /> 
      </div>
      <nav className="navigation">
        <button>Take Quiz</button>
        <button>Explore Careers</button>
      </nav>
      <div className="authentication">
        <button>Sign In</button>
        <button>Admin</button>
      </div>
    </header>
  );
}

export default Header;