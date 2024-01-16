import React from "react";
import styles from "./QuestionPage.module.css";

const questionArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const answerArray = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

export default function QuestionPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeader}>What Careers Can You Explore?</h1>

      <div className={styles.questionWrapper}>
        <div className={styles.questionGrid}>
          <p>(Left Arrow Here)</p>

          <div className={styles.questionLinks}>
            {questionArray.map((value) => {
              return <p className={styles.questionNumSquare}>{value}</p>;
            })}
          </div>

          <p>(Right Arrow Here)</p>
        </div>

        <p className={styles.textHeader}>
          Don't worry about time, money, training, or education. Just think do
          you enjoy it?
        </p>
      </div>
    </div>
  );
}
