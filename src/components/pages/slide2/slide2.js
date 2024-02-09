import React from "react";
import { Link } from "react-router-dom";
import styles from "./slide2.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";

export default function Slide2() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeading}>Before You Start Answering</h1>

      <div className={styles.modalWrapper}>
        <p className={styles.modalSubheading}>
          Please sign in to make sure your progress and results are saved.{" "}
          <br></br>You will also be able to login after the quiz to save the
          results but it does not save your progress through the quiz.
        </p>

        <Link to="/login" className={styles.signInLink}>
          <FontAwesomeIcon icon={faUserCheck} className={styles.userIcon} />
          Sign Up / Login In
        </Link>

        <Link to="/slide3" className={styles.guestLink}>
          I don't want to sign in
        </Link>
      </div>
    </div>
  );
}
