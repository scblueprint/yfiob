import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './Dashboard.module.css';
// import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TrendingChart() {
  
  // Michael Change: let navigate = useNavigate();

  let sectors = [
    { name: "Agriculture", percentage: 10, color: "rgba(255, 154, 100, 1)" },
    { name: "Sector 2", percentage: 9, color: "rgba(93, 121, 219, 1)" },
    { name: "Sector 3", percentage: 8, color: "rgba(145, 200, 136, 1)" },
    { name: "Sector 4", percentage: 7, color: "rgba(221, 191, 117, 1)" },
    { name: "Sector 5", percentage: 6, color: "rgba(214, 160, 160, 1)" },
    { name: "Sector 6", percentage: 5, color: "rgba(218, 210, 134, 1)" },
    { name: "Sector 7", percentage: 4, color: "rgba(239, 118, 79, 1)" },
    { name: "Sector 8", percentage: 3, color: "rgba(134, 180, 235, 1)" },
    { name: "Sector 9", percentage: 2, color: "rgba(209, 125, 125, 1)" },
    { name: "Sector 10", percentage: 1, color: "rgba(248, 213, 213, 1)" },
    { name: "Sector 11", percentage: 6, color: "rgba(208, 225, 240, 1)" },
    { name: "Sector 12", percentage: 5, color: "rgba(227, 202, 184, 1)" },
    { name: "Sector 13", percentage: 7, color: "rgba(71, 183, 73, 1)" },
    { name: "Sector 14", percentage: 9, color: "rgba(99, 141, 248, 1)" },
    { name: "Sector 15", percentage: 4, color: "rgba(143, 223, 144, 1)" },
  ];

  sectors = sectors.sort((a, b) => b.percentage - a.percentage);

  const data = {
    labels: sectors.map(sector => sector.name),
    datasets: [
      {
        label: 'Percentage',
        data: sectors.map(sector => sector.percentage),
        backgroundColor: sectors.map(sector => sector.color),
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: false 
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage'  
        }
      },
      x: {
        title: {
          display: false,
          text: 'Sectors'  
        }
      }
    }
  };
  


  return (
    <div className={styles.trendingChart}>
      <h2 className={styles.chartTitle}>Top Trending Sector</h2>
      <div className={styles.chartContent}>
        <div className={styles.topSector} style={{ backgroundColor: sectors[0].color }} />
        <span className={styles.topSectorName}>{sectors[0].name}</span>
      </div>
    
      <Bar data={data} options={options} />
     
    </div>
  );
}

export default TrendingChart;
