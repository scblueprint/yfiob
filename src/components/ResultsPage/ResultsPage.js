import React, { useState, useEffect } from "react";
import styles from "./ResultsPage.module.css";
import { getDoc } from "firebase/firestore"; 
import { auth } from "../../firebase/firebaseConfig"; 
import fetchUserAssessmentRef from "../../firebase/uploadResponses";

export default function ResultsPage() {
  const [industries, setIndustries] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {


        // Fetch the reference to the user's assessment document
        console.log("User ID: " + auth.currentUser.uid);
        const userAssessmentRef = await fetchUserAssessmentRef(auth.currentUser.uid);

        // Fetch the assessment document from Firestore
        const userAssessmentDoc = await getDoc(userAssessmentRef);

        // Extract the industries map from the assessment document
        if (userAssessmentDoc.exists()) {
          const data = userAssessmentDoc.data();
          const industryScores = data.industryScores || {};

          // Create an adjusted map with default values for any missing keys
          const industriesMap = {
            'Agriculture & Natural Resources': industryScores['Agriculture and Natural Resources'] || 0,
            'Energy': industryScores['Energy and Utilities'] || 0,
            'Arts, Media, and Entertainment': industryScores['Arts, Media, and Entertainment'] || 0,
            'Skilled Trades': industryScores['Building Trades and Construction'] || 0,
            'Engineering': industryScores['Engineering and Design Industry'] || 0,
            'Education & Child Development': industryScores['Education, Child Development, and Family Services'] || 0,
            'Psychology': industryScores['Psychology'] || 0,
            'Ecology & Environmental': industryScores['Ecology & Environmental'] || 0,
            'Health Science and Medical Technology': industryScores['Health Science and Medical Technology'] || 0,
            'Research & Academia': industryScores['Research & Academia'] || 0,
            'Hospitality, Tourism, and Recreation': industryScores['Hospitality, Tourism, and Recreation'] || 0,
            'IT, Software and Hardware Engineering': industryScores['Information Technology'] || 0,
            'Manufacturing and Product Development': industryScores['Manufacturing and Product Development'] || 0,
            'Marketing, Sales, Communications': industryScores['Marketing, Sales, and Service'] || 0,
            'Aviation': industryScores['Aviation'] || 0,
            'Supply Chain': industryScores['Supply Chain'] || 0,
            'Law, Law Enforcement': industryScores['Law, Law Enforcement'] || 0,
            'Business Management & Development': industryScores['Finance and Business'] || 0
          };

          setIndustries(industriesMap);
        }
      } catch (error) {
        console.error("Error fetching industry scores:", error);
      }
    };

    fetchData(); // Call the fetchData function to initiate data fetching
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeader}>Your Results</h1>
      <div className={styles.questionModalContainer}>
        <div className={styles.questionWrapper}>
          <p className={styles.textHeader}>
            These are the careers you matched with
          </p>

          <div className={styles.responseRow}>
            <table className={styles.table}>
              <tbody>
                {Object.entries(industries).map(([industry, score]) => (
                  <tr key={industry}>
                    <td>{industry}</td>
                    <td>{score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.questionGrid}></div>
    </div>
  );
};
