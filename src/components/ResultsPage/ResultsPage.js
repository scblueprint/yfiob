import React, { useEffect } from "react";
import styles from "./ResultsPage.module.css";
import { getDoc } from "firebase/firestore";
import { auth } from "../../firebase/firebaseConfig";
import { fetchUserAssessmentRef } from "../../firebase/uploadResponses";

import { Bar, Doughnut } from 'react-chartjs-2';
//Michael Change: import Chart from 'chart.js/auto';

export default function ResultsPage() {
  // TODO: setIndustries is declared but not being used anywhere, temporary fix to silence warnings
  // Michael Change: const [industries, setIndustries] = useState({});
  // Michael Change: console.log(setIndustries);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the reference to the user's assessment document
        // console.log("User ID on Results Page: " + auth.currentUser.uid);
        const userAssessmentRef = await fetchUserAssessmentRef(
          auth.currentUser.uid,
        );

        // Fetch the assessment document from Firestore
        // TODO: userAssessmentDoc is declared but not being used anywhere, temporary fix to silence warnings
        const userAssessmentDoc = await getDoc(userAssessmentRef);
        console.log(userAssessmentDoc);
        // console.log("got the doc on results page");
        //setIndustries(userAssessmentDoc.data());
        // Extract the industries map from the assessment document
        // if (userAssessmentDoc.exists()) {
        // const data = userAssessmentDoc.data();
        // const industryScores = data.industryScores || {};

        // Create an adjusted map with default values for any missing keys
        // const industriesMap = {
        //   'Agriculture & Natural Resources': industryScores['Agriculture and Natural Resources'] || 0,
        //   'Energy': industryScores['Energy and Utilities'] || 0,
        //   'Arts, Media, and Entertainment': industryScores['Arts, Media, and Entertainment'] || 0,
        //   'Skilled Trades': industryScores['Building Trades and Construction'] || 0,
        //   'Engineering': industryScores['Engineering and Design Industry'] || 0,
        //   'Education & Child Development': industryScores['Education, Child Development, and Family Services'] || 0,
        //   'Psychology': industryScores['Psychology'] || 0,
        //   'Ecology & Environmental': industryScores['Ecology & Environmental'] || 0,
        //   'Health Science and Medical Technology': industryScores['Health Science and Medical Technology'] || 0,
        //   'Research & Academia': industryScores['Research & Academia'] || 0,
        //   'Hospitality, Tourism, and Recreation': industryScores['Hospitality, Tourism, and Recreation'] || 0,
        //   'IT, Software and Hardware Engineering': industryScores['Information Technology'] || 0,
        //   'Manufacturing and Product Development': industryScores['Manufacturing and Product Development'] || 0,
        //   'Marketing, Sales, Communications': industryScores['Marketing, Sales, and Service'] || 0,
        //   'Aviation': industryScores['Aviation'] || 0,
        //   'Supply Chain': industryScores['Supply Chain'] || 0,
        //   'Law, Law Enforcement': industryScores['Law, Law Enforcement'] || 0,
        //   'Business Management & Development': industryScores['Finance and Business'] || 0
        // };

        // setIndustries(industriesMap);
      } catch (error) {
        console.error("Error fetching industry scores:", error);
      }
    };

    fetchData(); // Call the fetchData function to initiate data fetching
  }, []); // Empty dependency array ensures this runs only once after the initial render

  const barData = {
    labels: [
      'Agriculture & Natural Resources', 'Building and Construction Trades', 'Arts, Media and Entertainment'
    ],
    datasets: [
      {
        data: [18, 14, 10],
        backgroundColor: ['#40a1d9', '#f68424', '#50ba4f'],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const donutData = {
    labels: [
      'Agriculture & Natural Resources', 'Building and Construction Trades', 'Arts, Media and Entertainment'
    ],
    datasets: [
      {
        data: [18, 14, 10],
        backgroundColor: ['#40a1d9', '#f68424', '#50ba4f'],
        borderWidth: 1,
      },
    ],
  };

  const donutOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom', // Position the legend at the bottom
        align: 'start', // Align legend to the start of the container
        labels: {
          padding: 20, // Add padding between the chart and the legend
          boxWidth: 20, // Adjust the box width of the legend items
        },
      },
      datalabels: {
        color: '#fff',
        anchor: 'center',
        align: 'center',
        formatter: (value) => `${value}%`,
        font: {
          weight: 'bold',
        },
        padding: 10,
      },
    },
    layout: {
      padding: {
        top: 20, // Adjust this value to add padding between the chart and the top of the container
      },
    },
  };
  
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftHandSide}>
        <div className={styles.circleChart}>
          <Doughnut data = {donutData} options = {donutOptions}/>
        </div>
        <div className={styles.percentageChart}>percent chart</div>

        <div className={styles.share}>
          <h3>Share your results!</h3>
          <form>
            <input type="email" placeholder="Enter your email"></input>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      
      <div className={styles.rightHandSide}>
        <div className={styles.barChart}>
          <Bar data = {barData} options = {barOptions}/>
        </div>
        <div className={styles.careerExploration}>
          <h2>What Careers Can You Explore?</h2>

          <div className={styles.career}>
            <div className={styles.leftHandcareer}>
              <div className={styles.careerTitle}>Agricultural Architect</div>
              <div className={styles.textBox}>
                <p>An agricultural architect, also known as a rural architect or farm architect, is a professional who specializes in designing buildings, structures, and landscapes specifically tailored to the needs of agricultural operations.</p>
                <p>Their role involves combining knowledge of architecture, agricultural science, and engineering to create functional and efficient spaces for farming, livestock management, and agribusiness.</p>
              </div>
            </div>
            <div className = {styles.rightHandCareer}>photo placeholder</div>
          </div>

          <div className={styles.career}>
            <div className={styles.leftHandcareer}>
              <div className={styles.careerTitle}>Agricultural Engineer</div>
              <div className={styles.textBox}>
                <p>An agricultural engineer is a professional who applies engineering principles and technology to solve problems related to agriculture and food production.</p>
                <p>Their work encompasses a wide range of areas within the agricultural industry, including crop production, livestock management, soil conservation, irrigation, agricultural machinery, and post-harvest processing.</p>
              </div>
            </div>
            <div className = {styles.rightHandCareer}>photo placeholder</div>
          </div>

          <div className={styles.career}>
            <div className={styles.leftHandcareer}>
              <div className={styles.careerTitle}>Harvest Festival Organizer</div>
              <div className={styles.textBox}>
                <p>A harvest festival organizer is an individual or group responsible for planning, coordinating, and executing a harvest festival event.</p>
                <p>Harvest festivals are celebratory events that typically take place in agricultural communities during the autumn months to mark the end of the growing season and the successful harvest of crops.</p>
                <p>These festivals often feature a variety of activities, including agricultural displays, food and craft vendors, live music and entertainment, farm tours, and community gatherings.</p>
              </div>
            </div>
            <div className = {styles.rightHandCareer}>photo placeholder</div>
          </div>
        </div>
      </div>


          {/*
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
          */}

      
    </div>
  );
}
