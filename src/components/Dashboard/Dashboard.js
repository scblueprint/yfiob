import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard = ({ title, subtitle, children }) => {
  return (
    <div className={styles.dashboard}>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      {children}
    </div>
  );
};

export default Dashboard;
