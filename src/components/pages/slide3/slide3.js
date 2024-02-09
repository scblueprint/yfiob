import React from "react";
import styles from "./slide3.module.css";

function Slide3() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeading}>What Careers Can You Explore?</h1>

      <div className={styles.modalWrapper}>
        <p className={styles.modalSubheading}>
          Let us help find how your interests can relate to different fields of
          work! Take this quiz to help give you ideas on what your career search
          can look like.
        </p>

        <p className={styles.modalReadyText}>
          Don’t worry about time, money, training, or education. Just think
          about whether you enjoy it? Ready?
        </p>

        <button className={styles.modalStartButton}>
          Yes, I'm ready to start
        </button>
      </div>
    </div>
  );
}

export default Slide3;

