import React, { useState, useEffect } from "react";
import styles from "./ExploreCareersPage.module.css";
import getCareerData from "../../firebase/pullCareerData";

function ExploreCareersPage() {
  const [careerData, setCareerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const careersData = await getCareerData();
      setCareerData(careersData);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.textHeading}>Learn About Careers</h1>
      </div>

      {careerData.map((career, index) => (
        <div key={index} className={styles.modalWrapper}>

          <div className={styles.modalLeftContent}>
            <div className={styles.careerTitleDiv}>
              <div className={styles.careerTitleWrapper}>
                <p className={styles.titleText}>
                  {career.id}
                </p>
              </div>
            </div>
            <p className={styles.textHeader}>
              {career.description}
            </p>
          </div>
          <div className={styles.modalRightContent}>
            <img className={styles.careerImage} src={career.imageUrl} alt="Career" />
          </div>

        </div>
      ))}
    </div>
  );
}

export default ExploreCareersPage;
