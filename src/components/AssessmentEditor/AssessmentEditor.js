import React, { useState} from "react";
import getQuestions from "../../firebase/pullQuestions";

import styles from"./AssessmentEditor.module.css";


function AssessmentEditor() {
    const [questions, setQuestions] = useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
          const questionsData = await getQuestions();
          setQuestions(questionsData);
        };
        fetchData();
      }, []);
    
    const [selectedQuestion, setSelectedQuestion] = Array.from(Array(questions.length).keys())
    const handleClick = (questionIndex) => {
      return 0;
    }

    return (
        <div className={styles.page}>
            {questions.map((questionText, index) => {
              const isSelected = false;
              return (
                <div className={styles.allQuestionRows}>
                  <button
                    className={`${styles.questionRow} ${isSelected ? styles.isSelected : ""}`}
                    key={index}
                    onClick={() => handleClick(index)}
                  >
                    {questionText}
                  </button>
                </div>
              );
            })}
        </div>

    );
}

export default AssessmentEditor;