import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase/firebaseConfig";

import styles from "./QuestionPage.module.css";

import getQuestions from "../../firebase/pullQuestions";
import getQuestionsWeights from "../../firebase/pullQuestionsWeights";
import updateUserAssessment from "../../firebase/uploadResponses";
import calculateUserScores from "./resultsCalculation";

import styles from "./QuestionPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const answerArray = [
  "strongly disagree",
  "disagree",
  "neutral",
  "agree",
  "strongly agree"
];

export default function QuestionPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionsWeights, setQuestionsWeights] = useState([]);
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

      // console.log("Questions" + questionsData);

      const questionsWeightsData = await getQuestionsWeights();
      setQuestionsWeights(questionsWeightsData);
      // console.log("Question Weights" + JSON.stringify(questionsWeightsData));

      setSelectedAnswers(Array.from({ length: questionsData.length }, () => null)); // Initialize selectedAnswers

    };
    fetchData();
  }, []);

  // new stuff
  const navigate = useNavigate();

  const checkFinish = () => {
    return selectedAnswers.every(answer => answer !== null);
  };

  const goToResults = async () => {
    // console.log("go to results called");
    if (checkFinish()) {
      try {
        const industryScores = await calculateUserScores(selectedAnswers, questionsWeights);
        // console.log("industryScores Call:" + JSON.stringify(industryScores));
        
        await updateUserAssessment(auth.currentUser.uid, industryScores);
        
        navigate('/ResultsPage');
      } catch (error) {
        console.error("Error in goToResults:", error);
        alert('An error occurred while calculating or updating the scores.');
      }
    } else {
      alert('Please answer all questions before proceeding.');
    }
  };
  

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
          {checkFinish() && (
        <button className={styles.submitButton} onClick={goToResults}>
          Go to Results
        </button>
      )}

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
