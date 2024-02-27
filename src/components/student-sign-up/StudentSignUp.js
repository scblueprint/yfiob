import React from "react";
import styles from "./StudentSignUp.module.css"

export default function StudentSignUp() {
    return (
        <div className={styles.pageContainer}>
            <h1>Student Sign Up!</h1>

            <div className={styles.InputContainer}>
                <div classeName={styles.InputNameContainer}>
                    <div>
                        <label>First Name</label>
                        <input placeholder="First Name"></input>
                    </div>
                   
                    <div>
                        <label>Last Name</label>
                        <input placeholder="Last Name"></input>
                    </div>

                </div>

                <label>Email</label>
                <input placeholder="Email"></input>
                
                <label>Password</label>
                <input placeholder="Password"></input>

                <label>Confirm Password</label>
                <input placeholder="Confirm Password"></input>

            </div>
            
            <button>Sign Up!</button>

            <div className={styles.ExistingAccountLoginContainer}>
                <p>Already have an account?</p>
                <a href="google.com">Log In!</a>
            </div>
        </div>
    )
}