import React from 'react';
import styles from './Dashboard.module.css';
import CountUp from 'react-countup';

function AssessmentCard({ title, count, label }) {
  return (
    <article className={styles.assessmentCard}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <div className={styles.cardContent}>
        <span className={styles.cardCount}>
          <CountUp end={count} duration={3} />
        </span>
        <span className={styles.cardLabel}>{label}</span>
      </div>
    </article>
  );
}

export default AssessmentCard;
