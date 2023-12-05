import React from "react";
import styles from "./SignInPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SignIn() {
  return (
    <div className={`${styles.pageBackground}`}>
      <div className={`${styles.pageHeader}`}>
        <h1>Before You Start Answering</h1>
      </div>

      <div className={`${styles.wrapper}`}>
        <p className={`${styles.signInText}`}>
          Please sign in to make sure your progress and results are saved. You
          will also be able to login after the quiz to save the results but it
          does not save your progress through the quiz
        </p>

        <button className={`${styles.signInButton}`}>Sign In / Log In</button>

        <div className={`${styles.loginBottomRow}`}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={`${styles.arrowIcon}`}
          ></FontAwesomeIcon>

          <button className={`${styles.skipSignButton}`}>
            I don't want to sign in
          </button>

          <div className={`${styles.blankDiv}`}></div>
        </div>
      </div>
    </div>
  );
}
