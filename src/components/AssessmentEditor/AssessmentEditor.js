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
    
    console.log(questions);

    return (
        <div className={styles.questionBox}>
            {questions.map((questionText, index) => {
              const isSelected = false;
              return (
                <button
                  className={`${styles.questionRow} ${isSelected ? styles.isSelected : ""}`}
                  key={index}
                  onClick={() => console.log("handleSelect(currentQuestionIndex, index)")}
                >
                  {questionText}
                </button>
              );
            })}
        </div>

    );
}

export default AssessmentEditor;