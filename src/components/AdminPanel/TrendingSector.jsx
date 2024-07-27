import React from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './TrendingSector.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrendingSector = () => {
  const chartData = [
    { percentage: 10, color: 'rgba(255, 154, 100, 1)', height: 102 },
    { percentage: 10, color: 'rgba(93, 121, 219, 1)', height: 88 },
    { percentage: 10, color: 'rgba(145, 200, 136, 1)', height: 71 },
    { percentage: 10, color: 'rgba(221, 191, 117, 1)', height: 70 },
    { percentage: 10, color: 'rgba(214, 160, 160, 1)', height: 65 },
    { percentage: 10, color: 'rgba(218, 210, 134, 1)', height: 57 },
    { percentage: 10, color: 'rgba(239, 118, 79, 1)', height: 51 },
    { percentage: 10, color: 'rgba(134, 180, 235, 1)', height: 48 },
    { percentage: 10, color: 'rgba(209, 125, 125, 1)', height: 44 },
    { percentage: 10, color: 'rgba(248, 213, 213, 1)', height: 41 },
    { percentage: 10, color: 'rgba(208, 225, 240, 1)', height: 37 },
    { percentage: 10, color: 'rgba(227, 202, 184, 1)', height: 33 },
    { percentage: 10, color: 'rgba(71, 183, 73, 1)', height: 28 },
    { percentage: 10, color: 'rgba(99, 141, 248, 1)', height: 15 },
    { percentage: 10, color: 'rgba(143, 223, 144, 1)', height: 15 },
  ];

  const data = {
    labels: chartData.map((_, index) => `Item ${index + 1}`),
    datasets: [
      {
        label: 'Percentage',
        data: chartData.map((data) => data.percentage),
        backgroundColor: chartData.map((data) => data.color),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Trending Sectors',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <section className={styles.container}>
      <div className={styles.sectorWrapper}>
        <div className={styles.sectorIcon} />
        <h3 className={styles.sectorName}>Agriculture and Natural Resources</h3>
      </div>
      <Bar data={data} options={options} />
      <button className={styles.clickPrompt}>
        <span className={styles['visually-hidden']}>View more details about trending sectors</span>
        click to see more
      </button>
    </section>
  );
};

export default TrendingSector;
