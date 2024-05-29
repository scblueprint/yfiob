import React, { useState, useEffect} from "react";
import styles from "./ResultsPage.module.css";
import { PieChart, Pie, Cell} from 'recharts';
import { getDoc } from "firebase/firestore"; 
import { auth } from "../../firebase/firebaseConfig"; 
import {fetchUserAssessmentRef } from "../../firebase/uploadResponses"; 

const COLORS = ['#4C78E7', '#FF7023', '#47B749'];

export default function ResultsPage() {
  const [industries, setIndustries] = useState({});
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  console.log("results page loaded");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.currentUser) {
          // Fetch the reference to the user's assessment document if logged in
          const userAssessmentRef = await fetchUserAssessmentRef(auth.currentUser.uid);

          // console.log("User ID on Results Page: " + auth.currentUser.uid);

          // Fetch the assessment document from Firestore
          const userAssessmentDoc = await getDoc(userAssessmentRef);

          // console.log("got the doc on results page"); 
          //setIndustries(userAssessmentDoc.data());
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
        }
        else{
          // Set default industries data for non-logged-in users if needed
          const industryScores = JSON.parse(localStorage.getItem('industryScores')) || {};

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
      }
      catch (error) {
        console.error("Error fetching industry scores:", error);
      }
    };

    fetchData(); // Call the fetchData function to initiate data fetching
  }, []);

  const sortedIndustries = Object.entries(industries).sort(([, a], [, b]) => b - a);
  const pieData = sortedIndustries.map(([name, value], index) => ({
    name,
    value: parseFloat(value.toFixed(0)),
  }));
  const topThree = pieData.slice(0, 3);
  const otherTotal = pieData.slice(3).reduce((total, entry) => total + entry.value, 0);
  const otherData = { name: "Other", value: otherTotal };

  // Create new data array with top 3 industries and Other category
  const newData = [...topThree, otherData];

  const renderCustomLabel = ({ x, y, name, value }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject width="100%" height="100%">
          <div className={styles.customLabel}>
            <strong>{name}</strong>: {value}%
          </div>
        </foreignObject>
      </g>
    );
  };
  

  return (    
    <div className={styles.wrapper}>
      <h1 className={styles.textHeader}>Your Results</h1>
      <div className={styles.chartContainer}>
        <div className={styles.pieChart}>
          <PieChart width={400} height={400}>
            <Pie
              data={newData}
              cx={200}
              cy={200}
              labelLine={false}
              innerRadius={105}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={renderCustomLabel}
            >
              {newData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index < 3 ? COLORS[index] : '#CCCCCC'} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className={styles.barChart}>
          {/* Bar chart content */}
        </div>
      </div>
      <div className={styles.moreDetails}>
        <button onClick={() => setShowMoreDetails(!showMoreDetails)}>
          {showMoreDetails ? 'Hide details' : 'More details'}
        </button>
        {showMoreDetails && (
          <div className={styles.detailsList}>
            <ul>
              {sortedIndustries.map(([industry, score]) => (
                <li key={industry}>
                  <span>{(Math.abs(score)).toFixed(2)}%</span> ----- {industry}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.shareResults}>
        <h2>Share your results!</h2>
        <input type="email" placeholder="enter the email" />
        <button>Send</button>
      </div>
    </div>
  );  
};

