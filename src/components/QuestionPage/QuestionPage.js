import React, { useState } from "react";
import styles from "./QuestionPage.module.css";

import getQuestions from "../../firebase/pullQuestions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const answerArray = [
  "strongly disagree",
  "disagree",
  "neutral",
  "agree",
  "strongly agree",
];
// TO DO
// Make questions an array
const questions = getQuestions();


/*
const questions = [
  "I am passionate about working with nature and the environment.",
  "I find joy in creating and designing visual content, such as art or multimedia projects.",
  "I enjoy hands-on work and take satisfaction in building or constructing things.",
  "Promoting health and wellness is important to me, and I am interested in medical advancements.",
  "I am fascinated by technology and enjoy staying updated on the latest innovations.",
  "Providing excellent customer service and creating positive experiences for others is a priority for me.",
];
*/

export default function QuestionPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(questions.length - 1, prevIndex + 1),
    );
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeader}>What Careers Can You Explore?</h1>

      <div className={styles.questionModalContainer}>
        <button className={styles.arrowBtn} onClick={handlePrevious}>
          <FontAwesomeIcon className={styles.arrows} icon={faArrowLeft} />
        </button>

        <div className={styles.questionWrapper}>
          <p className={styles.textHeader}>
            Don't worry about time, money, training, or education. Just think do
            you enjoy it?
          </p>

          <p className={styles.questionPrompt}>
            {questions[currentQuestionIndex]}
          </p>

          <div className={styles.responseRow}>
            {answerArray.map((value) => {
              return (
                <button className={styles.answerResponseSquare}>{value}</button>
              );
            })}
          </div>
        </div>

        <button className={styles.arrowBtn} onClick={handleNext}>
          <FontAwesomeIcon className={styles.arrows} icon={faArrowRight} />
        </button>
      </div>

      <div className={styles.questionGrid}>
        {questions.map((question, index) => {
          return (
            <button
              key={index}
              className={`${styles.questionLinks} `}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
