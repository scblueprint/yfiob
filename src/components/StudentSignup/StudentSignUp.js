import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./StudentSignUp.module.css";
import signUpUser from "../../firebase/signUp";

export default function StudentSignUp() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    // Form validation
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be greater than 5 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setErrors(errors);

    // If not errors were present on sign in, process information
    if (Object.keys(errors).length === 0) {
      try {
        // Add user information to Firestore
        await signUpUser(formData.email, formData.password, formData.firstName);
        navigate("/signup2");

      } catch (error) {
        // Handle error if unable to complete account creation
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user account:", errorCode, errorMessage);
      }

      //Clear Form data after submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.signupHeader}>Student Signup!</h1>

      <form className={styles.inputContainer} onSubmit={handleNext}>
        <div className={styles.nameFields}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={styles.inputField}
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className={styles.errorMessage}>{errors.firstName}</span>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={styles.inputField}
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className={styles.errorMessage}>{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className={styles.emailpasswordFields}>
          <div className={styles.inputshift}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.inputField}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputshift}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.inputField}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          <div className={styles.inputshift}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={styles.inputField}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword}
              </span>
            )}
          </div>
        </div>

        <button type="submit" className={styles.NextBtn}>
          Next
        </button>
      </form>

      <div className={styles.existingAccountLoginContainer}>
        <p>Already have an account?</p>
        <Link to="/login" className={styles.loginLink}>
          Log In!
        </Link>
      </div>
    </div>
  );
}
