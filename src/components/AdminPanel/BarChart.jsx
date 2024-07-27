import React from 'react';
import styles from './TrendingSector.module.css';

const BarChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      {data.map((item, index) => (
        <div key={index} className={styles.barWrapper}>
          <div className={styles.barLabel}>{item.percentage}%</div>
          <div 
            className={styles.bar} 
            style={{ 
              backgroundColor: item.color,
              height: `${item.height}px`
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BarChart;