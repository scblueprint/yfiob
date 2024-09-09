import React, { useEffect, useState } from 'react';
import { getAssessmentsAnalytics } from '../../firebase/pullAnalytics';
import AssessmentCard from './AssessmentCard';
import TrendingChart from './TrendingChart';
import InfoCard from './InfoCard';
import styles from './Dashboard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faSchool

} from "@fortawesome/free-solid-svg-icons";

function Insights() {
    const [assessmentData, setAssessmentData] = useState([
        { title: "# of assessments taken in the last 7 days", count: 0, label: "new" },
        { title: "Total # of assessments taken", count: 0, label: "total" }
    ]);
    const [topSchool, setTopSchool] = useState('');
    const [topCareer, setTopCareer] = useState('');

    const careerColors = {
      "Accountant": "#FF5733",
      "Agricultural Scientist": "#DAF7A6",
      "Air Traffic Controller": "#FFC300",
      "Architect": "#581845",
      "Automotive Technician": "#C70039",
      "CNC Machinist": "#900C3F",
      "Carpenter": "#FF5733",
      "Childcare Worker": "#FFC300",
      "Civil Engineer": "#C70039",
      "Cybersecurity Analyst": "#900C3F",
      "Electrician": "#DAF7A6",
      "Event Planner": "#FF5733",
      "Fashion Designer": "#C70039",
      "Film Director": "#FFC300",
      "Financial Analyst": "#581845",
      "Firefighter": "#900C3F",
      "Fish and Game Warden": "#FF5733",
      "Forestry Technician": "#C70039",
      "Graphic Designer": "#FFC300",
      "Hotel Manager": "#DAF7A6",
      "Industrial Engineer": "#581845",
      "Interior Designer": "#C70039",
      "Market Research Analyst": "#900C3F",
      "Marketing Manager": "#FF5733",
      "Mechanical Engineer": "#C70039",
      "Medical Laboratory Technician": "#FFC300",
      "Network Administrator": "#581845",
      "Plumber": "#900C3F",
      "Police Officer": "#FF5733",
      "Power Plant Operator": "#C70039",
      "Preschool Teacher": "#FFC300",
      "Public Relations Specialist": "#581845",
      "Quality Control Inspector": "#900C3F",
      "Radiologic Technologist": "#DAF7A6",
      "Registered Nurse (RN)": "#FF5733",
      "Renewable Energy Technician": "#C70039",
      "Sales Manager": "#FFC300",
      "School Counselor": "#581845",
      "Social Worker": "#900C3F",
      "Software Developer": "#FF5733",
      "Sound Engineer": "#C70039",
      "Textile Designer": "#FFC300",
      "Travel Agent": "#581845",
      "Utility Lineworker": "#900C3F"
  };
  

    useEffect(() => {
        const fetchData = async () => {
            const [recentCount, totalCount, mostPopularSchool, mostPopularCareer] = await getAssessmentsAnalytics();
            setAssessmentData([
                { title: "# of assessments taken in the last 7 days", count: recentCount, label: "new" },
                { title: "Total # of assessments taken", count: totalCount, label: "total" }
            ]);
            setTopSchool(mostPopularSchool);
            setTopCareer(mostPopularCareer);
        };
        fetchData();
    }, []);

    return (
        <main className={styles.dashboard}>
            <section className={styles.assessmentSection}>
                {assessmentData.map((data, index) => (
                    <AssessmentCard key={index} {...data} />
                ))}
            </section>
            <section className={styles.trendingSection}>
                <TrendingChart />
                <InfoCard 
                    title="Top Trending School" 
                    content={topSchool}   
                    icon={<div className={styles.schoolIcon}><FontAwesomeIcon icon={faSchool} /></div>}
                />
                <InfoCard 
                    title="Most Clicked on Career" 
                    content={topCareer}
                    icon={<div className={styles.careerIcon} style={{ backgroundColor: careerColors[topCareer] }} />}
                />
            </section>
        </main>
    );
}

export default Insights;
