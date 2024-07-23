import React, { useState } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";
import Dashboard from "../Dashboard/Dashboard";
import UsersPanel from "../UsersPanel/UsersPanel";
import Insights from "./Insights";
import AssessmentEditor from "../AssessmentEditor/AssessmentEditor";
import styles from "./AdminPanel.module.css";

function AdminPanel() {
  const [currentPage, setCurrentPage] = useState("Data");
  const assessmentStats = [
    { title: "# of assessments taken in the last 7 days", value: 10, label: "new" },
    { title: "total # of assessments taken", value: 100, label: "total" }
  ];

  return (
    <div className={styles.container}>
      <SideNavbar selectedItem={currentPage} setSelectedItem={setCurrentPage} />
      {currentPage === "Data" ? (
        <Dashboard
          // title={"Data"}
          // subtitle={"Breakdown of students career quiz results."}
        >
          {/* Dashboard content goes in here */}
          Breakown of stuents career quiz results.
          <Insights>

          </Insights>
        </Dashboard>
      ) : (
        ""
      )}

      {currentPage === "Student Accounts" ? (
        <Dashboard
          title={"Student Accounts"}
          subtitle={"Breakdown of students account information."}
        >
          {/* Dashboard content goes in here */}
          <UsersPanel />
        </Dashboard>
      ) : (
        ""
      )}

      {currentPage === "Survey Questions" ? (
        <Dashboard
          title={"Survey Questions"}
        >
          {/* Dashboard content goes in here */}
          Here you can add/edit all the survey questions.
          <AssessmentEditor />
        </Dashboard>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminPanel;
