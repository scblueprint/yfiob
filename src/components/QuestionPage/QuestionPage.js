import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./QuestionPage.module.css";
import getQuestions from "../../firebase/pullQuestions";
import getQuestionsWeights from "../../firebase/pullQuestionsWeights";
import updateUserAssessment from "../../firebase/uploadResponses";
import calculateUserScores from "./resultsCalculation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import puzzle from "../../assets/Jigna.svg";
import puzzleOdd from "../../assets/Jigna Small.svg";
import character from "../../assets/Character.svg";

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
  const [questionsWeights, setQuestionsWeights] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isComplete, setComplete] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (questionIndex, answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
    const areAllNotNull = newSelectedAnswers.every((i) => i !== null);
    setComplete(areAllNotNull);
  };

  useEffect(() => {
    const fetchData = async () => {
      const questionsData = await getQuestions();
      setQuestions(questionsData);
      const questionsWeightsData = await getQuestionsWeights();
      setQuestionsWeights(questionsWeightsData);
      setSelectedAnswers(Array.from({ length: questionsData.length }, () => null));
    };
    fetchData();
  }, []);

  const checkFinish = () => selectedAnswers.every((answer) => answer !== null);

  const goToResults = async () => {
    if (checkFinish()) {
      try {
        const industryScores = await calculateUserScores(selectedAnswers, questionsWeights);
        await updateUserAssessment(auth.currentUser.uid, industryScores);
        navigate("/ResultsPage");
      } catch (error) {
        console.error("Error in goToResults:", error);
        alert("An error occurred while calculating or updating the scores.");
      }
    } else {
      alert("Please answer all questions before proceeding.");
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
    }
  };

  const handleSubmit = async () => {
    if (isComplete) {
      if (auth.currentUser) {
        await goToResults();
      } else {
        navigate("/ResultsPage");
      }
    } else {
      alert("Please answer all questions before submitting.");
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
                  ></div>
                );
              })}
            </div>
          </div>

          <div className={styles.textHeader}>
            <img className={styles.puzzleImage} src={character} alt="puzzle piece" />
            <p>
              Don't worry about time, money, training, or education. Just think,
              do you enjoy it?
            </p>
          </div>

          <div className={styles.questionPrompt}>
            <span>{questions[currentQuestionIndex]}</span>
            <img className={styles.puzzleImage} src={currentQuestionIndex % 2 === 0 ? puzzle : puzzleOdd} alt="puzzle piece" />
          </div>
          <div className={styles.responseRow}>
            {answerArray.map((value, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;
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
