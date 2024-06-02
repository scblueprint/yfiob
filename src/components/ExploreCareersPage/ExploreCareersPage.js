import React, { useState, useEffect } from "react";
import styles from "./ExploreCareersPage.module.css";
import getCareerData from "../../firebase/pullCareerData";
import filterIcon from "../../assets/FilterCircle.svg";
import Modal from "../Modal/Modal";

function ExploreCareersPage() {
	// Holds all career data
	const [careerData, setCareerData] = useState([]);
	// Holds career data that is filtered based on selected industries
	const [filteredCareerData, setFilteredCareerData] = useState([]);
	// Holds all unique industries from career data
	const [careerFilterOptions, setCareerFilterOptions] = useState([]);
	// Holds industries that are selected by the user
	const [clickedFilterIndustries, setClickedFilterIndustries] = useState({});

	useEffect(() => {
		async function fetchCareerData() {
			// Get career data from Firebase
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
		// Check if all filter options are deselected
		const allFiltersDeselected = Object.values(clickedFilterIndustries).every(
			(value) => !value
		);
		// Filter career data based on selected industries or return all data if all options are deselected
		const filteredData = allFiltersDeselected
			? careerData
			: careerData.filter((career) => clickedFilterIndustries[career.industry]);
		setFilteredCareerData(filteredData);
	}, [clickedFilterIndustries, careerData]);

	return (
		<div className={styles.wrapper}>
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
							{careerFilterOptions.map((industry, _) => (
								<button
									key={industry}
									className={
										clickedFilterIndustries[industry]
											? styles.clickedFilterIndustryButton
											: styles.filterIndustryButton
									}
									onClick={() =>
										setClickedFilterIndustries((prevState) => ({
											...prevState,
											[industry]: !prevState[industry],
										}))
									}
								>
									{industry}
								</button>
							))}
						</div>
					</Modal.Content>
				</Modal>
			</div>

			<div className={styles.careersContainer}>
				{filteredCareerData.map((career, index) => (
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
										<p className={styles.textCareerTitle}>{career.id}</p>
									</div>
								</div>
								<div className={styles.careerDescriptionContainer}>
									<p className={styles.textCareerDescription}>
										{career.description}{" "}
										<a
											href="https://yfiob.org/wtb-podcast-clips"
											className={styles.learnMore}
										>
											Learn&nbsp;more...
										</a>
									</p>
								</div>
							</div>

							<div className={styles.modalRightContent}>
								<img
									className={styles.careerImage}
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
