import React, { useState} from "react";
import getQuestions from "../../firebase/pullQuestions";
import * as Collapsible from '@radix-ui/react-collapsible';
import * as Form from '@radix-ui/react-form';
import { RowSpacingIcon } from '@radix-ui/react-icons';

import styles from"./AssessmentEditor.module.css";


function AssessmentEditor() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion] = useState([]);



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
                <Collapsible.Root open={selectedQuestion[index]} key={index} onOpenChange={console.log("setSelectedQuestion(index)")}>

                  <div className={styles.allQuestionRows}>
                    <div className={styles.questionRow}>
                      <span className={styles.questionRow} key={index}>
                        {questionText}
                        <Collapsible.Trigger asChild>
                          <div>
                            <button>
                              <RowSpacingIcon />
                            </button>
                          </div>
                        </Collapsible.Trigger>
                      </span>
                    </div>
                  </div>

                  <Collapsible.Content>
                    <div className={styles.questionRow}>
                      <span className={styles.questionRow}>
                        <Form.Root>
                          <Form.Field name="question">
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                              <Form.Label>Question</Form.Label>
                              <Form.Message match="valueMissing">
                                  Please edit the question
                              </Form.Message>
                            </div>
                            <Form.Control asChild>
                              <textarea placeholder={questionText} required />
                            </Form.Control>
                          </Form.Field>
                          <Form.Submit asChild>
                            <button style={{ marginTop: 10 }}>
                              Submit Changes
                            </button>
                          </Form.Submit>
                        </Form.Root>


                      
                      </span>
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              );
            })}
        </div>

    );
}

export default AssessmentEditor;