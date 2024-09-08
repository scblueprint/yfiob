import React, { useState, useEffect } from "react";
import getQuestions from "../../firebase/pullQuestions";
import getQuestionsWeights from "../../firebase/pullQuestionsWeights";
import updateQuestion from "../../firebase/updateQuestion";
import * as Collapsible from '@radix-ui/react-collapsible';
import * as Form from '@radix-ui/react-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./AssessmentEditor.module.css";

function AssessmentEditor() {
    const [questions, setQuestions] = useState([]);
    const [questionsWeights, setQuestionsWeights] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        const questionsData = await getQuestions();
        setQuestions(questionsData);
        console.log("Questions:", questionsData); 

        const questionsWeightsData = await getQuestionsWeights();
        setQuestionsWeights(questionsWeightsData);
        console.log("Question Weights:", questionsWeightsData); 

        setSelectedQuestion(new Array(questionsData.length).fill(false));
    };
    fetchData();
}, []);


    const toggleQuestion = (index) => {
        setSelectedQuestion(prev => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };
    const handleDataFetch = async () => {
      const questionsData = await getQuestions();
      setQuestions(questionsData);
      console.log("Questions:", questionsData);
  
      const questionsWeightsData = await getQuestionsWeights();
      setQuestionsWeights(questionsWeightsData);
      console.log("Question Weights:", questionsWeightsData);
  
      setSelectedQuestion(new Array(questionsData.length).fill(false));
  };
  const industries = [
    "Agriculture and Natural Resources", "Arts, Media, and Entertainment", "Aviation",
    "Building Trades and Construction", "Ecology & Environmental", 
    "Education, Child Development, and Family Services", "Energy and Utilities",
    "Engineering and Design Industry", "Fashion and Interior Design", 
    "Finance and Business", "Health Science and Medical Technology", 
    "Hospitality, Tourism, and Recreation", "Information Technology", 
    "Law, Law Enforcement", "Manufacturing and Product Development",
    "Marketing, Sales, and Service", "Psychology", "Public Services",
    "Research & Academia", "Skilled Trades", "Supply Chain", "Transportation"
];

return (
    <div className={styles.page}>
        {questions.map((questionText, index) => (
            <Collapsible.Root 
                open={selectedQuestion[index]} 
                onOpenChange={() => toggleQuestion(index)}
                key={index}
            >
                <div className={styles.allQuestionRows}>
                    <div className={styles.questionRow}>
                        <span className={styles.questionNumber}>{index + 1}.</span>
                        <span className={styles.questionRow2}>
                            {questionText}
                            <Collapsible.Trigger asChild>
                                <button className={styles.searchButton}>
                                    <FontAwesomeIcon icon={selectedQuestion[index] ? faCaretDown : faCaretRight} />
                                </button>
                            </Collapsible.Trigger>
                        </span>
                    </div>
                </div>
                <Collapsible.Content>
                    <div className={styles.questionRow3}>
                        <Form.Root onSubmit={async (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const data = Object.fromEntries(formData);
                            try {
                                await updateQuestion(questionText, data);
                                console.log("Question updated");
                                await handleDataFetch();
                            } catch (errors) {
                                console.log("Update failed", errors);
                            }
                        }}>
                            <Form.Field name="question">
                                <div>
                                    <Form.Label className={styles.questionTitle}>Question</Form.Label>
                                    {/* <Form.Message match="valueMissing">
                                        Please edit the question
                                    </Form.Message> */}
                                </div>
                                <Form.Control asChild>
                                    <textarea
                                        className={styles.formEntry} 
                                        placeholder={questionText}
                                        required 
                                        
                                    />
                                </Form.Control>
                            </Form.Field>
                            <div  className={styles.questionTitle}> Weights</div>
                            <div className={styles.industryFields}>
                                {industries.map((industry) => {
                                    const fieldName = industry;
                                    const weight = questionsWeights[index]?.[fieldName] || 0;  
                                    return (
                                        <Form.Field key={industry} name={fieldName}>
                                            <Form.Label>{industry}</Form.Label>
                                            <Form.Control asChild>
                                                <input type="number" min="0" max="1" step="0.1" className={styles.smallInput} defaultValue={weight} placeholder={weight} />
                                            </Form.Control>
                                        </Form.Field>
                                    );
                                })}
                            </div>
                            <Form.Submit asChild>
                                <div className={styles.submitContainer}>
                                    <button type="submit" className={styles.submitBtn}>Submit</button>
                                </div>
                            </Form.Submit>
                        </Form.Root>
                    </div>
                </Collapsible.Content>
            </Collapsible.Root>
        ))}
    </div>
);


}

export default AssessmentEditor;
