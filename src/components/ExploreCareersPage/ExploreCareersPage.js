import React, { useState, useEffect } from "react";
import styles from "./ExploreCareersPage.module.css";
import getCareerData from "../../firebase/pullCareerData";
import filterIcon from "../../assets/FilterCircle.svg";
import Modal from "../Modal/Modal";

function ExploreCareersPage() {
  const [careerData, setCareerData] = useState([]);
  const [careerFilterOptions, setcareerFilterOptions] = useState([]);

  useEffect(() => {
    async function fetchCareerData () {
      const careersData = await getCareerData();
      setCareerData(careersData);
      const industries = careersData.map(career => career.industry);
      const uniqueIndustries = [...new Set(industries)];
      setcareerFilterOptions(uniqueIndustries);
    };
    fetchCareerData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.textHeading}>Learn About Careers</h1>
      <div className={styles.filterContainer}>
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
          <Modal.Content title="Career Types">
            <div className={styles.filterIndustriesContainer}>
              {careerFilterOptions.map((industry, index) => (
                  <div key={index} className={styles.filterIndustryWrapper}>
                    {/* TODO: Add onClick event to filter careers by industry
                                or something to filter the career data */}
                    <button className={styles.filterIndustryButton}>
                      {industry}
                    </button>
                  </div>
              ))
              }
            </div>
          </Modal.Content>
        </Modal>
      </div>

    <div className={styles.careersContainer}>
        {careerData.map((career, index) => (
          <div key={index} className={styles.individualCareerContainer}>
            <div className={styles.careerIndustryWrapper}>
              <p className={styles.textCareerindustry}>
                <i>{career.industry}</i>
              </p>
            </div>

            <div className={styles.modalWrapper}>

              <div className={styles.modalLeftContent}>
                <div className={styles.careerTitleContainer}>
                  <div className={styles.careerTitleWrapper}>
                    <p className={styles.textCareerTitle}>
                      {career.id}
                    </p>
                  </div>
                </div>
                <div className={styles.careerDescriptionContainer}>
                  <p className={styles.textCareerDescription}>
                    {career.description}
                  </p>
                </div>
              </div>

              <div className={styles.modalRightContent}>
                <img className={styles.careerImage} 
                     src={career.imageUrl} 
                     alt="Career" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreCareersPage;
