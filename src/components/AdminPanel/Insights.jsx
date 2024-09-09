import styles from './Dashboard.module.css';
import AssessmentCard from './AssessmentCard';
import TrendingChart from './TrendingChart';
import InfoCard from './InfoCard';
import React, { useEffect, useState } from 'react';
import { getAssessmentsAnalytics } from '../../firebase/pullAnalytics';

function Insights() {
  const [assessmentData, setAssessmentData] = useState([
    { title: "# of assessments taken in the last 7 days", count: 0, label: "new" },
    { title: "Total # of assessments taken", count: 0, label: "total" }
  ]);
  const [topSchool, setTopSchool] = useState(''); // State to store the most popular school name

  useEffect(() => {
    const fetchData = async () => {
        const [recentCount, totalCount, mostPopularSchool] = await getAssessmentsAnalytics(); // Retrieve the most popular school
        setAssessmentData([
            { title: "# of assessments taken in the last 7 days", count: recentCount, label: "new" },
            { title: "Total # of assessments taken", count: totalCount, label: "total" }
        ]);
        setTopSchool(mostPopularSchool); // Update the state with the most popular school name
    };
    fetchData();
  }, []);

  return (
    <main className={styles.dashboard}>
      <section className={styles.assessmentSection}>
        {assessmentData.map((data, index) => (
          <AssessmentCard key={index} {...data} />
        ))}
      </section>
      <section className={styles.trendingSection}>
        <TrendingChart />
        <InfoCard 
          title="Top Trending School" 
          content={topSchool}   // Display the most popular school name
          icon={<div className={styles.schoolIcon} />}
        />
        <InfoCard 
          title="Most Clicked on Career" 
          content="Agricultural Engineer" 
          icon={<div className={styles.careerIcon} />}
        />
      </section>
    </main>
  );
}

export default Insights;
