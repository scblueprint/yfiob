import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./slide1.module.css";
import { db } from "../../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function Slide_1() {
  const [questions, setQuestions] = useState(0);
  useEffect(() => {
      async function getSize() {
          try {
              const docRef = doc(db, 'assessment data', 'questions');
              const docSnapshot = await getDoc(docRef);
              if (docSnapshot.exists()) {
                  const field = docSnapshot.data().allQuestions;
                  let size = 0;
                  for (const key in field) {
                      if (field.hasOwnProperty(key)) {
                          size++;
                      }
                  }
                  setQuestions(size);
              } 
              else {
                  console.log("No such document!");
              }
          } 
          catch (error) {
              console.error("Error:", error);
          }
      }
      getSize();
  });
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeading}>What Careers Can You Explore?</h1>

      <div class={styles.modalWrapper}>
        <p className={styles.modalSubheading}>
          Let us help find how your interests can relate to different fields of
          work! Take this quiz to help give you ideas on what your career search
          can look like.
        </p>

        <Link to="/slide2" className={styles.assessLink}>
          Quick Assessment
        </Link>

        <p class={styles.assessText}>
        {`This quick assessment consists of ${questions} questions, but will not be as
          representative of who you are.`}
        </p>
      </div>
    </div>
  );
}

export default Slide_1;
