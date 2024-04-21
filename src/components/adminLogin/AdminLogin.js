import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import "./AdminLogin.module.css";

function AdminLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // Listen for authentication state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (admin) => {
      if (admin) {
        // Admin is signed in
        console.log(admin);
        setUser(admin);
        // ***************************************
        // Implement once adminPanel is functional
        //
        // navigate("/adminPanel")
        // ***************************************
      } else {
        // Admin is signed out
        setUser(null);
      }
    });

    // Clean up the subscription
    return unsubscribe;
  }, [setUser, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // If successful, admin is signed in
        const admin = userCredentials.user;
        console.log(`${admin.email} is admins email`);
        // ***************************************
        // Implement once adminPanel is functional
        //
        // navigate("/adminPanel")
        // ***************************************
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
      });

      // Clear form data after submission
      setEmail("");
      setPassword("");
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
