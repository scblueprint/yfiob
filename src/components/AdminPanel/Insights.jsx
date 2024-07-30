import React from 'react';
import styles from './Insights.module.css';
import StatCard from './StatCard';
import TrendingSector from "./TrendingSector";  
 
// import TrendingChart from './TrendingChart';
// import TopTrendingItem from './TopTrendingItem';

function Insights() {
  const assessmentStats = [
    { title: "# of assessments taken in the last 7 days", value: 10, label: "new" },
    { title: "total # of assessments taken", value: 100, label: "total" },
  ];

  const Trends = [
    { title: "Top trending Sector" },
    { title: "Top trending high school" },
    { title: "Most clicked on career" },
  ];

  return (
    <main className={styles.dashboard}>
      <section className={styles.statsSection}>
        {assessmentStats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} label={stat.label}>
           
          </StatCard>
        ))}

      </section>
      <section className={styles.trendsSection}>
        {Trends.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} label={stat.label} >
            {/* {index === 0 && <TrendingSector />} */}
            
          </StatCard>
          
        ))}
        
      </section>
      <section className={styles.statsSection}>

      </section>
      
      {/* <TrendingChart />
      <TopTrendingItem title="top trending school" value="East High" />
      <TopTrendingItem 
        title="most clicked on career" 
        value="Agricultural Engineer" 
        iconColor="#ff9a64"  */}
    </main>
  );
}

export default Insights;
