import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./StudentSignUp2.module.css";
import signUpUser from "../../firebase/signUp";
import addUserToFirestore from "../../firebase/newuser";
import { auth } from "../../firebase/firebaseConfig";

export default function StudentSignUp2() {
  const [formData, setFormData] = React.useState({
    school: "",
    grade: "",
    zipcode: "",
  });
  const [errors, setErrors] = React.useState({});
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "school") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          school: "School is not valid",
        }));
        setSubmitDisabled(true); // Disable submit button if there's an error
      } else {
        // Clear the error if the input is valid
        setErrors((prevErrors) => ({
          ...prevErrors,
          school: "",
        }));
        setSubmitDisabled(false); // Enable submit button if there's no error
      }
    }

    if (name === "zipcode" && !/^\d{0,5}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        zipcode: "Zip code must be 5 digits",
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    const errors = {};
    if (!formData.school.trim()) {
      errors.school = "School name is required";
    }
    if (!formData.grade.trim()) {
      errors.grade = "Grade is required";
    }
    if (!formData.zipcode.trim()) {
      errors.zipcode = "Zipcode is required";
    }
    if (formData.zipcode.length !== 5) {
      errors.zipcode = "Zipcode must be equal to 5 characters";
    }
    setErrors(errors);

    // If no errors were present on sign in, process information
    if (Object.keys(errors).length === 0) {
      try {
        // Add user information to Firestore
        //await signUpUser(formData.school, formData.grade, formData.zipcode);

        const currentUser = auth.currentUser;
        addUserToFirestore(currentUser.uid, currentUser.email , currentUser.displayName, formData.zipcode, formData.school, formData.grade);
        // Redirect to login page after successful account creation
        navigate("/login");
      } catch (error) {
        // Handle error if unable to complete account creation
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user account:", errorCode, errorMessage);
      }

      // Clear Form data after submission
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
          <input
            type="text"
            name="school"
            placeholder="School"
            className={styles.inputField}
            value={formData.school}
            onChange={handleChange}
          />
          {errors.school && (
            <span className={styles.errorMessage}>{errors.school}</span>
          )}
        </div>

        <div className={styles.emailpasswordFields}>
          <div className={styles.inputshift}>
            <select
              name="grade"
              className={styles.inputField}
              value={formData.grade}
              onChange={handleChange}
            >
              <option value="">Select Grade</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
            </select>
            {errors.grade && (
              <span className={styles.errorMessage}>{errors.grade}</span>
            )}
          </div>
          <div className={styles.inputshift}>
            <input
              type="text"
              name="zipcode"
              placeholder="Zipcode"
              className={styles.inputField}
              value={formData.zipcode}
              onChange={handleChange}
            />
            {errors.zipcode && (
              <span className={styles.errorMessage}>{errors.zipcode}</span>
            )}
          </div>
        </div>

        <button type="submit" className={styles.NextBtn} disabled={submitDisabled}>
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
