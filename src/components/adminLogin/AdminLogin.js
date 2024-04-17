import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.module.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <h2 className="student">Admin Log In</h2>
        <form onSubmit={handleSubmit}>
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
          <button className="login-btn" type="submit">
            Log In
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <a className="signup-link" href="/signup">
            Sign Up!
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
