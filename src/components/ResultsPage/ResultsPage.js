import React, { useState, useEffect, useRef } from "react";
import styles from "./ResultsPage.module.css";
import { getDoc } from "firebase/firestore";
import { auth } from "../../firebase/firebaseConfig";
import { fetchUserAssessmentRef } from "../../firebase/uploadResponses";
import { Bar, Doughnut } from "react-chartjs-2";

// Import required Chart.js components
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function ResultsPage() {
  const [industries, setIndustries] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const doughnutRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
    
        if (!user) {
          throw new Error("User is not authenticated");
        }
    
        const uid = user.uid;
    
        const userAssessmentRef = await fetchUserAssessmentRef(uid);
        console.log("User Assessment Ref:", userAssessmentRef.path);
    
        const userAssessmentDoc = await getDoc(userAssessmentRef);
    
        if (userAssessmentDoc.exists()) {
          const data = userAssessmentDoc.data();
          console.log("Full Document Data:", data);
    
          const industryScores = data.Industries;  // Access the nested Industries object
          if (!industryScores) {
            console.error("No industry scores found in the document!");
            return;
          }
    
          console.log('Fetched Industry Scores:', industryScores);
    
          const sortedIndustries = Object.entries(industryScores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
    
          console.log("Sorted Industries:", sortedIndustries);
    
          setIndustries(sortedIndustries);
    
          const newChartData = {
            labels: sortedIndustries.map(([industry]) => industry),
            datasets: [
              {
                data: sortedIndustries.map(([_, score]) => score),
                backgroundColor: ["#40a1d9", "#f68424", "#50ba4f"],
              },
            ],
          };
    
          setChartData(newChartData);
          console.log("Chart Data:", newChartData);
        } else {
          console.error("No document found for the user!");
        }
      } catch (error) {
        console.error("Error fetching industry scores:", error);
      }
    };    

    fetchData();

    return () => {
      if (doughnutRef.current) {
        doughnutRef.current.destroy();
      }
      if (barRef.current) {
        barRef.current.destroy();
      }
    };
  }, []);

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

  const donutOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "start",
        labels: {
          padding: 20,
          boxWidth: 20,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        left: 20,
      },
    },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftHandSide}>
        <div className={styles.circleChart}>
          <Doughnut ref={doughnutRef} data={chartData} options={donutOptions} />
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
          <Bar ref={barRef} data={chartData} options={barOptions} />
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
    </div>
  );
}
