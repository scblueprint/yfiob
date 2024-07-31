import React from 'react';
import styles from './Dashboard.module.css';


function InfoCard({ title, content, icon }) {
  return (
    <article className={styles.infoCard}>
      <h2 className={styles.infoTitle}>{title}</h2>
      <div className={styles.infoContent}>
        {icon && icon}
        <span className={styles.infoText}>{content}</span>
      </div>

    </article>
  );
}

export default InfoCard;