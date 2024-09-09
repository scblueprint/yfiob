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
    { name: "Agriculture", percentage: 9.6, color: "rgba(255, 154, 100, 1)" },
      { name: "Technology", percentage: 9.2, color: "rgba(93, 121, 219, 1)" },
      { name: "Healthcare", percentage: 8.1, color: "rgba(145, 200, 136, 1)" },
      { name: "Finance", percentage: 7.4, color: "rgba(221, 191, 117, 1)" },
      { name: "Energy", percentage: 6.8, color: "rgba(214, 160, 160, 1)" },
      { name: "Real Estate", percentage: 5.5, color: "rgba(218, 210, 134, 1)" },
      { name: "Consumer Goods", percentage: 4.3, color: "rgba(239, 118, 79, 1)" },
      { name: "Utilities", percentage: 3.6, color: "rgba(134, 180, 235, 1)" },
      { name: "Transportation", percentage: 2.8, color: "rgba(209, 125, 125, 1)" },
      { name: "Retail", percentage: 1.9, color: "rgba(248, 213, 213, 1)" },
      { name: "Manufacturing", percentage: 6.1, color: "rgba(208, 225, 240, 1)" },
      { name: "Construction", percentage: 5.2, color: "rgba(227, 202, 184, 1)" },
      { name: "Education", percentage: 7.7, color: "rgba(71, 183, 73, 1)" },
      { name: "Telecommunications", percentage: 9.4, color: "rgba(99, 141, 248, 1)" },
      { name: "Agriculture", percentage: 4.6, color: "rgba(143, 223, 144, 1)" }
  
  
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
