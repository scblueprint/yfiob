import React, { useState } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";
import Dashboard from "../Dashboard/Dashboard";

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
          This is the user content
        </Dashboard>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminPanel;

// {/* <div className={styles.buttonStack}> */}
// {/*     <div className={styles.buttonWithIcon}> */}
// {/*         <FontAwesomeIcon icon={faChartLine} /> */}
// {/*         <button onClick={() => handleButtonClick("data")}>Data</button> */}
// {/*     </div> */}
// {/*     <div className={styles.buttonWithIcon}> */}
// {/*         <FontAwesomeIcon icon={faUserGroup} /> */}
// {/*         <button onClick={() => handleButtonClick("users")}>Student Accounts</button> */}
// {/*     </div> */}
// {/* </div> */}
// {/* <div className={styles.dataContainer}> */}
// {/*     {currentPage === "data" && <DataPage />} */}
// {/*     {currentPage === "users" && <UsersPanel />} */}
// {/* </div> */}
