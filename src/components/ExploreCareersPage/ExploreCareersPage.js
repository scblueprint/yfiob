import React, { useState, useEffect } from "react";
import styles from "./ExploreCareersPage.module.css";
import getCareerData from "../../firebase/pullCareerData";
import filterIcon from "../../assets/FilterCircle.svg";
import Modal from "../Modal/Modal";
import { db } from "../../firebase/firebaseConfig";
import { doc, updateDoc, increment } from "firebase/firestore";

function ExploreCareersPage() {
    const [careerData, setCareerData] = useState([]);
    const [filteredCareerData, setFilteredCareerData] = useState([]);
    const [careerFilterOptions, setCareerFilterOptions] = useState([]);
    const [clickedFilterIndustries, setClickedFilterIndustries] = useState({});

    useEffect(() => {
        async function fetchCareerData() {
            const careersData = await getCareerData();
            setCareerData(careersData);
            setFilteredCareerData(careersData);
            const industries = careersData.map((career) => career.industry);
            const uniqueIndustries = [...new Set(industries)];
            setCareerFilterOptions(uniqueIndustries);
        }
        fetchCareerData();
    }, []);

    useEffect(() => {
        const filteredData = Object.keys(clickedFilterIndustries).every(key => !clickedFilterIndustries[key])
            ? careerData
            : careerData.filter(career => clickedFilterIndustries[career.industry]);
        setFilteredCareerData(filteredData);
    }, [clickedFilterIndustries, careerData]);

    const handleLearnMoreClick = async (careerId) => {
        // Reference to the specific career document in Firestore
        const careerRef = doc(db, "career data", careerId);
        // Increment the visitors count
        await updateDoc(careerRef, {
            visitors: increment(1)
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <h1 className={styles.textHeading}>Learn About Careers</h1>
                <div className={styles.filterContainer}>
                    <p className={styles.filterText}>Search by career types</p>
                    <Modal defaultOpen={false}>
                        <Modal.Button asChild>
                            <button className={styles.filterButton}>
                                <img src={filterIcon} alt={"Filter Icon"} />
                            </button>
                        </Modal.Button>
                        <Modal.Content title="Career Types">
                            <div className={styles.filterIndustriesContainer}>
                                {careerFilterOptions.map(industry => (
                                    <button
                                        key={industry}
                                        className={clickedFilterIndustries[industry] ? styles.clickedFilterIndustryButton : styles.filterIndustryButton}
                                        onClick={() => setClickedFilterIndustries(prev => ({ ...prev, [industry]: !prev[industry] }))}
                                    >
                                        {industry}
                                    </button>
                                ))}
                            </div>
                        </Modal.Content>
                    </Modal>
                </div>
            </div>

            <div className={styles.careersContainer}>
                {filteredCareerData.map((career) => (
                    <div key={career.id} className={styles.individualCareerContainer}>
                        <div className={styles.careerIndustryWrapper}>
                            <p className={styles.textCareerindustry}><i>{career.industry}</i></p>
                        </div>
                        <div className={styles.modalWrapper}>
                            <div className={styles.modalLeftContent}>
                                <div className={styles.careerTitleContainer}>
                                    <div className={styles.careerTitleWrapper}>
                                        <p className={styles.textCareerTitle}>{career.id}</p>
                                    </div>
                                </div>
                                <div className={styles.careerDescriptionContainer}>
                                    <p className={styles.textCareerDescription}>
                                        {career.description}{" "}
                                        <a
                                            href="https://yfiob.org/wtb-podcast-clips"
                                            className={styles.learnMore}
                                            onClick={() => handleLearnMoreClick(career.id)}
                                        >
                                            Learn&nbsp;more...
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className={styles.modalRightContent}>
                                <img className={styles.careerImage} src={career.imageUrl} alt="Career" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExploreCareersPage;
