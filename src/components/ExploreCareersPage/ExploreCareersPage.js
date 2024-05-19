import React, { useState, useEffect } from "react";
import styles from "./ExploreCareersPage.module.css";
import getCareerData from "../../firebase/pullCareerData";
import filterIcon from "../../assets/FilterCircle.svg";
import Modal from "../Modal/Modal";

function ExploreCareersPage() {
  const [careerData, setCareerData] = useState([]);

  useEffect(() => {
    async function fetchCareerData () {
      const careersData = await getCareerData();
      setCareerData(careersData);
    };
    fetchCareerData();
  }, []);

  return (
    <div className={styles.wrapper}>

      <h1 className={styles.textHeading}>Learn About Careers</h1>

      <div className={styles.filterDiv}>
        <p className={styles.filterText}>
          Search by career types
        </p>
        <Modal defaultOpen={false}>
            <Modal.Button asChild>
              <button className={styles.filterButton}>
                <img
                  src={filterIcon}
                  alt={"Filter Icon"}
                />
              </button>
          </Modal.Button>
          <Modal.Content>
            Filtering soon
          </Modal.Content>
        </Modal>
      </div>

    <div className={styles.careersContainer}>
        {careerData.map((career, index) => (
          <div key={index} className={styles.modalWrapper}>

            <div className={styles.modalLeftContent}>

              <div className={styles.careerTitleDiv}>
                <div className={styles.careerTitleWrapper}>
                  <p className={styles.textTitle}>
                    {career.id}
                  </p>
                </div>
              </div>

              <div className={styles.careerDescriptionDiv}>
                <p className={styles.textDescription}>
                  {career.description}
                </p>
              </div>
            </div>

            <div className={styles.modalRightContent}>
              <img className={styles.careerImage} src={career.imageUrl} alt="Career" />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreCareersPage;
