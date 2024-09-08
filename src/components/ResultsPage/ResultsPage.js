import React, { useState, useEffect, useRef } from "react";
import styles from "./ResultsPage.module.css";
import { getDoc } from "firebase/firestore";
import { auth } from "../../firebase/firebaseConfig";
import { fetchUserAssessmentRef } from "../../firebase/uploadResponses";
import { Bar, Doughnut } from "react-chartjs-2";
import getCareerData from "../../firebase/pullCareerData";

// Import required Chart.js components
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function ResultsPage() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [careers, setCareers] = useState([]);
  const [industryColors, setIndustryColors] = useState({});
  const [sortedIndustries, setSortedIndustries] = useState([]);
  const [percentages, setPercentages] = useState({}); // Store percentages here

  const doughnutRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        let industryScores;
  
        if (user) {
          const uid = user.uid;
          const userAssessmentRef = await fetchUserAssessmentRef(uid);
          const userAssessmentDoc = await getDoc(userAssessmentRef);
  
          if (userAssessmentDoc.exists()) {
            const data = userAssessmentDoc.data();
            industryScores = data.Industries;
          } else {
            console.error("No document found for the user!");
            return;
          }
        } else {
          // For non-authenticated users, get data from localStorage
          const localData = localStorage.getItem("guestIndustryScores");
          if (localData) {
            industryScores = JSON.parse(localData);
          } else {
            console.error("No local results for guest user!");
            return;
          }
        }
  
        if (industryScores) {
          // Directly multiply existing score by 100
          const industryPercentages = Object.entries(industryScores).reduce(
            (acc, [industry, score]) => {
              acc[industry] = (score * 100).toFixed(2);
              return acc;
            },
            {}
          );
          setPercentages(industryPercentages);
  
          const sortedIndustries = Object.entries(industryScores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
  
          setSortedIndustries(sortedIndustries);
  
          const colors = ["#40a1d9", "#f68424", "#50ba4f"];
          const industryColorMap = sortedIndustries.reduce(
            (map, [industry], index) => {
              map[industry] = colors[index];
              return map;
            },
            {}
          );
  
          setIndustryColors(industryColorMap);
  
          const newChartData = {
            labels: sortedIndustries.map(([industry]) => industry),
            datasets: [
              {
                data: sortedIndustries.map(([_, score]) => score),
                backgroundColor: colors,
              },
            ],
          };
  
          setChartData(newChartData);
  
          // Fetch career data for the top 3 industries
          const careerData = await getCareerData();
          const topCareers = careerData.filter((career) =>
            sortedIndustries.some(([industry]) => career.industry === industry)
          );
          setCareers(topCareers);
        }
      } catch (error) {
        console.error("Error fetching industry scores:", error);
      }
    };
  
    fetchData();

    const doughnutChart = doughnutRef.current;
    const barChart = barRef.current;

    return () => {
      if (doughnutChart) doughnutChart.destroy();
      if (barChart) barChart.destroy();
    };
  }, []);

  const groupedCareers = careers.reduce((acc, career) => {
    const { industry } = career;
    if (!acc[industry]) {
      acc[industry] = [];
    }
    acc[industry].push(career);
    return acc;
  }, {});

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
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
      padding: { top: 20, left: 20 },
    },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftHandSide}>
        <div className={styles.circleChart}>
          <Doughnut ref={doughnutRef} data={chartData} options={donutOptions} />
        </div>
        <div className={styles.percentageChart}>
          <h3>Industry Percentage Breakdown</h3>
          <ul>
            {Object.entries(percentages).map(([industry, percentage]) => (
              <li key={industry} style={{ color: industryColors[industry] || "#000" }}>
                {percentage}% ----- {industry}
              </li>
            ))}
          </ul>
        </div>
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
          {sortedIndustries.map(([industry]) => (
            <div key={industry}>
              <h3
                className={styles.industryTitle}
                style={{
                  backgroundColor: industryColors[industry] || "#e0e0e0",
                }}
              >
                {industry}
              </h3>
              {groupedCareers[industry]?.map((career, index) => (
                <div key={index} className={styles.career}>
                  <div className={styles.leftHandcareer}>
                    <div className={styles.careerTitle}>{career.id}</div>
                    <div className={styles.textBox}>
                      <p>{career.description}</p>
                    </div>
                  </div>
                  <div className={styles.rightHandCareer}>
                    {career.imageUrl ? (
                      <img
                        src={career.imageUrl}
                        alt={career.id}
                        className={styles.careerImage}
                      />
                    ) : (
                      <p>No Image Available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
