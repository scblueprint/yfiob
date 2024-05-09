import React, { useState } from "react";
import styles from "./ResultsPage.module.css";

// import getQuestions from "../../firebase/pullQuestions";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// const answerArray = [
//   "strongly disagree",
//   "disagree",
//   "neutral",
//   "agree",
//   "strongly agree",
// ];

export default function ResultsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);


//   const handleSelect = (questionIndex, answerIndex) => {
//     console.log("handle selected");
//     const newSelectedAnswers = [...selectedAnswers]; // get current state of selectedAnswers array
//     newSelectedAnswers[questionIndex] = answerIndex; // update the "new" selected answers array with question answer
//     setSelectedAnswers(newSelectedAnswers); // update original selected answers array
//     console.log(selectedAnswers);
//   };

//   React.useEffect(() => {
//     const fetchData = async () => {
//       const questionsData = await getQuestions();
//       setQuestions(questionsData);
//       setSelectedAnswers(Array.from({ length: questionsData.length }, () => null)); // Initialize selectedAnswers
//     };
//     fetchData();
//   }, []);

//   const handlePrevious = () => {
//     setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1));
//   };

//   const handleNext = () => {
//     setCurrentQuestionIndex((prevIndex) =>
//       Math.min(questions.length - 1, prevIndex + 1),
//     );
//   };

return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeader}>Your Results</h1>
      <div className={styles.questionModalContainer}>

        <div className={styles.questionWrapper}>
          <p className={styles.textHeader}>
            These are the careers you matched with
          </p>

          <p className={styles.questionPrompt}>
            
          </p>

          <div className={styles.responseRow}>
            
          </div>
        </div>


      </div>

      <div className={styles.questionGrid}>

      </div>
    </div>
  );
}

