import React from 'react';
import styles from './StatCard.module.css';

function StatCard({ title, value, label }) {
  return (
    <article className={styles.statCard}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.valueWrapper}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </article>
  );
}

export default StatCard;