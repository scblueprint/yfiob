import React from "react";
import styles from "./QuestionPage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const questionArray = [1, 2, 3, 4, 5, 6];

const answerArray = [
  "strongly disagree",
  "disagree",
  "neutral",
  "agree",
  "strongly agree",
];

export default function QuestionPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeader}>What Careers Can You Explore?</h1>

      <div className={styles.questionModalContainer}>
        <FontAwesomeIcon className={styles.arrows} icon={faArrowLeft} />

        <div className={styles.questionWrapper}>
          <p className={styles.textHeader}>
            Don't worry about time, money, training, or education. Just think do
            you enjoy it?
          </p>

          <p className={styles.questionPrompt}>
            “I am passionate about working with nature and the environment.”
          </p>

          <div className={styles.responseRow}>
            {answerArray.map((value) => {
              return (
                <button className={styles.answerResponseSquare}>{value}</button>
              );
            })}
          </div>
        </div>

        <FontAwesomeIcon className={styles.arrows} icon={faArrowRight} />
      </div>

      <div className={styles.questionGrid}>
        {questionArray.map((value) => {
          return <button className={styles.questionLinks}>{value}</button>;
        })}
      </div>
    </div>
  );
}
