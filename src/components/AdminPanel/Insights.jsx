import React from 'react';
import styles from './Dashboard.module.css';
import AssessmentCard from './AssessmentCard';
import TrendingChart from './TrendingChart';
import InfoCard from './InfoCard';

function Insights() {
  const assessmentData = [
    { title: "# of assessments taken in the last 7 days", count: 10, label: "new" },
    { title: "Total # of assessments taken", count: 100, label: "total" }
  ];

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
          content="East High"   
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