import React from 'react';
import styles from './Dashboard.module.css';

function AssessmentCard({ title, count, label }) {
  return (
    <article className={styles.assessmentCard}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <div className={styles.cardContent}>
        <span className={styles.cardCount}>{count}</span>
        <span className={styles.cardLabel}>{label}</span>
      </div>
    </article>
  );
}

export default AssessmentCard;