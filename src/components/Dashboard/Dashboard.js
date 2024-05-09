import React from "react";
import styles from "./Dashboard.module.css";
import SideNavbar from "../SideNavbar/SideNavbar";

const Dashboard = ({ children }) => {
  return (
    <div>
      <SideNavbar />
      <div>{children}</div>
    </div>
  );
};

function DashboardContent({ title, subtitle, children }) {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      <div>{children}</div>
    </div>
  );
}
Dashboard.Content = DashboardContent;
export default Dashboard;
