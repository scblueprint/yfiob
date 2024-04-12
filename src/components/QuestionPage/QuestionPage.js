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

export default function QuestionPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const questionsData = await getQuestions();
      setQuestions(questionsData);
    };
    fetchData();
  }, []);

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
            {answerArray.map((value, idx) => {
              return (
                <button className={styles.answerResponseSquare} key={idx}>
                  {value}
                </button>
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