import React from "react";
import { Link } from "react-router-dom";
import styles from "./StudentSignUp.module.css";

export default function StudentSignUp() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
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
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form submission logic goes here, e.g., send data to Firebase
      console.log("Form submitted:", formData);
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

      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <div className={styles.nameFields}>
          <div>
            <label className={styles.inputFieldLabels}>First Name:</label>
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
            <label className={styles.inputFieldLabels}>Last Name:</label>
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
          <div>
            <label className={styles.inputFieldLabels}>Email:</label>
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

          <div>
            <label className={styles.inputFieldLabels}>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.inputField}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <div>
            <label className={styles.inputFieldLabels}>Confirm Password:</label>
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

        <button type="submit" className={styles.signupBtn}>
          Sign Up
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

