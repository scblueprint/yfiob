import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import getQuestions from "../../firebase/pullQuestions";
//import uploadResponses from "../../firebase/uploadResponses";

import styles from "./QuestionPage.module.css";
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
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isComplete, setComplete] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (questionIndex, answerIndex) => {
    console.log("handle selected");
    const newSelectedAnswers = [...selectedAnswers]; // get current state of selectedAnswers array
    newSelectedAnswers[questionIndex] = answerIndex; // update the "new" selected answers array with question answer
    setSelectedAnswers(newSelectedAnswers); // update original selected answers array

    // check all questions have been answered
    var areAllNotNull = newSelectedAnswers.every(function (i) {
      return i !== null;
    });
    // Quiz state set to complete if no question unanswered
    setComplete(areAllNotNull);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const questionsData = await getQuestions();
      setQuestions(questionsData);
      setSelectedAnswers(
        Array.from({ length: questionsData.length }, () => null),
      ); // Initialize selectedAnswers
    };
    fetchData();
  }, []);

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      navigate("/resultsPage"); // Navigate to the results page
    } else {
      setCurrentQuestionIndex((prevIndex) =>
        Math.min(questions.length - 1, prevIndex + 1),
      );
    }
  };

  const handleSubmit = () => {
    if (isComplete) {
      console.log("Submitted");
      // if user logged in
      // uploadResponses(selectedAnswers)
      navigate("/resultsPage");
    } else {
      console.log("Quiz not finished.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.textHeader}>What Careers Can You Explore?</h1>
      </div>

      <div className={styles.questionModalContainer}>
        <button className={styles.arrowBtn} onClick={handlePrevious}>
          <FontAwesomeIcon className={styles.arrows} icon={faArrowLeft} />
        </button>

        <div className={styles.questionWrapper}>
          <div className={styles.progressIndicator}>
            <div className={styles.questionBar}>
              {questions.map((_, index) => {
                const isSelected = selectedAnswers[index] !== null;
                return (
                  <div
                    key={index}
                    className={`${styles.questionLinks} ${isSelected ? styles.isAnswered : ""}`}
                  >
                  </div>
                );
              })}
            </div>
          </div>
          <p className={styles.textHeader}>
            Don't worry about time, money, training, or education. Just think,
            do you enjoy it?
          </p>

          <p className={styles.questionPrompt}>
            {questions[currentQuestionIndex]}
          </p>

          <div className={styles.responseRow}>
            {answerArray.map((value, index) => {
              const isSelected =
                selectedAnswers[currentQuestionIndex] === index; // Determine if this answer is the selected one
              return (
                <button
                  className={`${styles.answerResponseSquare} ${isSelected ? styles.isSelected : ""}`}
                  key={index}
                  onClick={() => handleSelect(currentQuestionIndex, index)}
                >
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
        <div>
          <button
            className={`${styles.submitButton} ${isComplete ? styles.submittable : styles.notSubmittable}`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
  );
}
