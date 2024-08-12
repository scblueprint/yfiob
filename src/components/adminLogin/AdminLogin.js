import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import styles from "./AdminLogin.module.css";

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

  // // Listen for authentication state changes
  // React.useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (admin) => {
  //     if (admin) {
  //       console.log(admin);
  //       setUser(admin);
  //       navigate("/adminPanel");
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return unsubscribe;
  // }, [setUser, navigate]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (admin) => {
      if (admin) {
        console.log(admin);
        setUser(admin);
        
        const userId = admin.uid;
        const adminRef = doc(db, "Users", userId);
        const adminSnap = await getDoc(adminRef);
        if (adminSnap.exists()) {
          console.log("User is not an admin.");
          navigate("/login");
        } else {
          console.log("User is an admin.");
          navigate("/adminPanel"); 
        }
      } else {
        setUser(null);
      }
    });
  
    return unsubscribe;
  }, [setUser, navigate]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAdminLogin(email, password);
  };

  const handleAdminLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const adminRef = doc(db, "admin accounts", userId);
      const adminSnap = await getDoc(adminRef);

      if (adminSnap.exists()) {
        console.log("User is an admin.");
        navigate("/adminPanel");
      } else {
        console.log("User is not an admin.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.adminHeader}>Admin Log In</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
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
        <button className={styles.loginBtn} type="submit">
          Log In!
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;