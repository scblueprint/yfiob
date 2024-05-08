import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import styles from "./AdminPanel.module.css";
import DataPage from "../DataPage/DataPage";
import UsersPanel from "../UsersPanel/UsersPanel";

function AdminPanel() {
  const [currentPage, setCurrentPage] = useState("data");

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
        <div className={styles.buttonStack}>
            <div className={styles.buttonWithIcon}>
                <FontAwesomeIcon icon={faChartLine} />
                <button onClick={() => handleButtonClick("data")}>Data</button>
            </div>
            <div className={styles.buttonWithIcon}>
                <FontAwesomeIcon icon={faUserGroup} />
                <button onClick={() => handleButtonClick("users")}>Student Accounts</button>
            </div>
        </div>
        <div className={styles.dataContainer}>
            {currentPage === "data" && <DataPage />}
            {currentPage === "users" && <UsersPanel />}
        </div>
    </div>
  );
}

export default AdminPanel;
