import React, { useState } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";
import Dashboard from "../Dashboard/Dashboard";
import UsersPanel from "../UsersPanel/UsersPanel";

function AdminPanel() {
  const [currentPage, setCurrentPage] = useState("Data");

  return (
    <div>
      <SideNavbar selectedItem={currentPage} setSelectedItem={setCurrentPage} />
      {currentPage === "Data" ? (
        <Dashboard
          title={"Data"}
          subtitle={"Breakdown of students career quiz results."}
        >
          {/* Dashboard content goes in here */}
          This is the data content
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
    </div>
  );
}

export default AdminPanel;
