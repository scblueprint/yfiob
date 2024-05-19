import React, {useState} from "react";
import styles from "./ExploreCareersPage.module.css";
import getCareerData from "../../firebase/pullCareerData";

function ExploreCareersPage() {

    return (
    <div className={styles.wrapper}>
        <div>
            <h1 className={styles.textHeading}>Learn About Careers</h1>
        </div>

        <div className={styles.modalWrapper}>

            <div className={styles.modalLeftContent}>
                <div className={styles.careerTitleDiv}>
                    <div className={styles.careerTitleWrapper}>
                        <p className={styles.titleText}>
                            Career
                        </p>
                    </div>
                </div>

                <p className={styles.textHeader}>
                        Please sign in to make sure your progress and results are saved.{" "}
                        <br></br>You will also be able to login after the quiz to save the
                        results but it does not save your progress through the quiz.
                </p>
            </div>

            <div className={styles.modalRightContent}>
                <p className={styles.textHeader}>
                    IMAGE HERE
                </p>
            </div>

        </div>
  </div>
    );
}

export default ExploreCareersPage;
