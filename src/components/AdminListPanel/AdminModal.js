import React, { useState } from 'react';
import styles from './AdminsListPanel.module.css';
import Modal from "../Modal/Modal";
import signUpAdmin from "../../firebase/signUpAdmin";
import { useNavigate } from "react-router-dom";



function AdminModal(props) {
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email: '',
        password: ''
    });
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const newErrors = {};
    //     // Validation logic
    //     if (!formData.email.trim()) {
    //         newErrors.email = "Email is required";
    //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //         newErrors.email = "Email address is invalid";
    //     }
    //     if (!formData.password.trim()) {
    //         newErrors.password = "Password is required";
    //     }
    //     if (formData.password.length < 6) {
    //         newErrors.password = "Password must be at least 6 characters";
    //     }
    //     setErrors(newErrors);

    //     if (Object.keys(newErrors).length === 0) {
    //         console.log("Submitted Data:", formData);
    //         // Assuming the admin user is added here
    //         // Reset form
    //         setFormData({
    //             email: '',
    //             password: ''
    //         });
    //     }
        
    // };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Button Pressed: Submitting form with data:", formData);
  
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

      
      // Log the errors object to the console
      console.log("Validation Errors:", errors);
  
      setErrors(errors);
  
      // Proceed only if there are no errors
      if (Object.keys(errors).length === 0) {
          try {
              // Add user information to Firestore
              await signUpAdmin(formData.email, formData.password, formData.firstName, formData.lastName).then(userID => {
                  console.log("Admin Signed Up");
                  props.updateList();
                  navigate("/adminPanel");
              })
              .catch(error => {
                  console.error("Error on Admin Sign Up:", error);
              });
  
              // Clear form data after successful submission
              setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: ""
              });
          } catch (error) {
              console.error("Error creating user account:", error.code, error.message);
          }
      }
  };
  

    return (
        <Modal.Content title={"Add New Admin"}>
            <div className={styles.signupContainer}>
                <form onSubmit={handleSubmit}>
                <div className={styles.buttonContainer}>
                    <div className={styles.nameContainer}>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                autoComplete="off"
                                className={styles.search}
                                placeholder="Enter First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                autoComplete="off"
                                className={styles.search}
                                placeholder="Enter Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                        </div>
                    </div>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="off"
                            className={styles.search}
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="off"
                            className={styles.search}
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.signupBtn}>Add Admin</button>
                    </div>

                </form>
            </div>
        </Modal.Content>
    );
}

export default AdminModal;
