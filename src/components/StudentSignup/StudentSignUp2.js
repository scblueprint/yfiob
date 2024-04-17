import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./StudentSignUp2.module.css";
import signUpUser from "../../firebase/signUp";

export default function StudentSignUp2() {
  const [formData, setFormData] = React.useState({
    school: "",
    grade: "",
    zipcode: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    const errors = {};
    if (!formData.school.trim()) {
      errors.firstName = "School name is required";
    }
    if (!formData.grade.trim()) {
      errors.lastName = "Grade is required";
    }
    if (!formData.zipcode.trim()) {
        errors.lastName = "Zipcode is required";
      }
    if (formData.zipcode.length > 5) {
      errors.password = "Zipcode must be equal to 5 characters";
    }
    setErrors(errors);

    // If not errors were present on sign in, process information
    if (Object.keys(errors).length === 0) {
      try {
        // Add user information to Firestore
        await signUpUser(formData.school, formData.grade, formData.zipcode);

        // Redirect to login page after successful account creation
        navigate("/login");
      } catch (error) {
        // Handle error if unable to complete account creation
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user account:", errorCode, errorMessage);
      }

      //Clear Form data after submission
      setFormData({
        school: "",
        grade: "",
        zipcode: "",
      });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.signupHeader}>Student Sign Up!</h1>

      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <div className={styles.inputshift}>
            
          <div>
            <input
              type="text"
              name="School"
              placeholder="School"
              className={styles.inputField}
              value={formData.school}
              onChange={handleChange}
            />
            {errors.school && (
              <span className={styles.errorMessage}>{errors.firstName}</span>
            )}
          </div>
        </div>

        <div className={styles.emailpasswordFields}>
          <div className={styles.inputshift}>
            <input
              type="text"
              name="grade"
              placeholder="Grade"
              className={styles.inputField}
              value={formData.grade}
              onChange={handleChange}
            />
            {errors.grade && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputshift}>
            <input
              type="zipcode"
              name="zipcode"
              placeholder="x x x x x"
              className={styles.inputField}
              value={formData.zipcode}
              onChange={handleChange}
            />
            {errors.zipcode && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>
        </div>

        <button type="submit" className={styles.NextBtn}>
          Submit
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
