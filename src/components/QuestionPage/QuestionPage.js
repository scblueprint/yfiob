import React from "react";
import styles from "./QuestionPage.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'


const questionArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

const answerArray = [
  "strongly agree", "agree", "neutral", "disagree", "strongly disagree"
]


export default function QuestionPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeader}>What Careers Can You Explore?</h1>

      <div className={styles.questionWrapper}>
        <div className={styles.questionGrid}>
        <FontAwesomeIcon icon={faChevronLeft}/>

          <div className={styles.questionLinks}>
            {questionArray.map((value) => {
              return <p className={styles.questionNumSquare}>{value}</p>;
            })}
          </div>

          <FontAwesomeIcon icon={faChevronRight}/>
        </div>

        <p className={styles.textHeader}>
          Don't worry about time, money, training, or education. Just think do
          you enjoy it?
        </p>
      
        <p className={styles.questionDisplay}>
          I like to build cupboards.
        </p>

        <div className={styles.responseRow}>
          {answerArray.map((value) => {
            return <button className={styles.answerResponseSquare}>{value}</button>
          })}
        </div>

      <div className={styles.arrowRow}>
        <FontAwesomeIcon className={styles.leftArrow} icon={faArrowLeft}/>
      </div>

      </div>
    </div>
  );
}
