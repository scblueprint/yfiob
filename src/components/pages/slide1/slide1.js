import React from "react";
import { Link } from "react-router-dom";
import styles from "./slide1.module.css";

function Slide_1() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeading}>What Careers Can You Explore?</h1>

      <div class={styles.modalWrapper}>
        <p className={styles.modalSubheading}>
          Let us help find how your interests can relate to different fields of
          work! Take this quiz to help give you ideas on what your career search
          can look like.
        </p>

        <Link to="/slide2" className={styles.assessLink}>
          Quick Assessment
        </Link>

        <p class={styles.assessText}>
          This quick assessment consists of 6 questions, but will not be as
          representative of who you are.
        </p>
      </div>
    </div>
  );
}

export default Slide_1;
