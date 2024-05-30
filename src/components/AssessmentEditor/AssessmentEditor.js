import React, { useState} from "react";
import getQuestions from "../../firebase/pullQuestions";
import updateQuestion from "../../firebase/updateQuestion";
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
                <Collapsible.Root open={selectedQuestion[index]} key={index}>

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
                        <Form.Root
                              // `onSubmit` only triggered if it passes client-side validation
                              onSubmit={(event) => {
                                const data = Object.fromEntries(new FormData(event.currentTarget));

                                // Submit form data and catch errors in the response
                                updateQuestion(questionText, data)
                                  .then(() => {})
                                  .catch((errors) => console.log(errors));

                                // prevent default form submission
                                event.preventDefault();
                              }}
                        
                        >
                          <Form.Field name="question">
                            <div>
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
                            <button>
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