import React, { useState} from "react";
import getQuestions from "../../firebase/pullQuestions";
import * as Collapsible from '@radix-ui/react-collapsible';
import * as Form from '@radix-ui/react-form';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';

import styles from"./AssessmentEditor.module.css";


function AssessmentEditor() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(0);
    const [open, setOpen] = useState([]);

    const handleSelect = (questionIndex) => {
      setSelectedQuestion(questionIndex)
    }

    const isSelected = (questionIndex) => {
      return selectedQuestion == questionIndex;
    }

    React.useEffect(() => {
        const fetchData = async () => {
          const questionsData = await getQuestions();
          setQuestions(questionsData);
        };
        fetchData();
      }, []);
    

        return (
        <div className={styles.page}>
            {questions.map((questionText, index) => {
              return (
                <Collapsible.Root className={styles.allCollapsibles} open={open[index]} key={index} onOpenChange={console.log("opened.", {index})}>

                  <div className={styles.allQuestionRows}>
                    <div className={styles.questionRow}>
                      <span className={`${styles.questionRow} ${isSelected(index) ? styles.isSelected : ""}`} key={index}>
                        {questionText}
                        <Collapsible.Trigger asChild>
                          <button className="IconButton">{open ? <Cross2Icon /> : <RowSpacingIcon />}</button>
                        </Collapsible.Trigger>
                      </span>
                    </div>
                  </div>

                  <Collapsible.Content>
                    <div className={styles.questionRow}>
                      <span className={styles.Text}>Edit</span>
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              );
            })}
        </div>

    );
    /*
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
    */
}

export default AssessmentEditor;