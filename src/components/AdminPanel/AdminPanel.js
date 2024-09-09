import React, { useState } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";
import Dashboard from "../Dashboard/Dashboard";
import UsersPanel from "../UsersPanel/UsersPanel";
import AdminListPanel from "../AdminListPanel/AdminListPanel";
import Insights from "./Insights";
import AssessmentEditor from "../AssessmentEditor/AssessmentEditor";
import styles from "./AdminPanel.module.css";


function AdminPanel() {
  const [currentPage, setCurrentPage] = useState("Data");

  return (
    <div className={styles.container}>
      <SideNavbar selectedItem={currentPage} setSelectedItem={setCurrentPage} />
      {currentPage === "Data" ? (
        <Dashboard
           title={"Insights"}
           subtitle={"Breakdown of students career quiz results."}
        >
          <Insights></Insights>
        </Dashboard>
      ) : (
        ""
      )}

      {currentPage === "Student Accounts" ? (
        <Dashboard
          title={"Student Accounts"}
          subtitle={"Breakdown of students account information."}
        >

          <UsersPanel />
        </Dashboard>
      ) : (
        ""
      )}

      {currentPage === "Survey Questions" ? (
        <Dashboard
          title={"Survey Questions"}
          subtitle={"Here you can add/edit all the survey questions."}
        >
          <AssessmentEditor />
        </Dashboard>
      ) : (
        ""
      )}

      {currentPage === "Admin Manager" ? (
        <Dashboard
          title={"Admin Manager"}
          subtitle={"View and manage admin permissions."}
        >
          <AdminListPanel />
        </Dashboard>
      ) : (
        ""
      )}
    </div>
    
  );
}

export default AdminPanel;
