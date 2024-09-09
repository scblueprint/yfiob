import React from "react";
import styles from "./SideNavbar.module.css";
import NavItem from "../NavItem/NavItem";
import { faChartBar, faUsers, faQuestion, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideNavbar = ({ selectedItem, setSelectedItem }) => {
  const handleItemClick = (label) => {
    setSelectedItem(label);
  };

  return (
    <nav className={styles.sidenav}>
      <ul className={styles.list}>
        <NavItem
          icon={<FontAwesomeIcon icon={faChartBar} />}
          label="Data"
          selected={selectedItem === "Data"}
          onItemClick={handleItemClick}
        />
        <NavItem
          icon={<FontAwesomeIcon icon={faUsers} />}
          label="Student Accounts"
          selected={selectedItem === "Student Accounts"}
          onItemClick={handleItemClick}
        />
        <NavItem
          icon={<FontAwesomeIcon icon={faQuestion} />}
          label="Survey Questions"
          selected={selectedItem === "Survey Questions"}
          onItemClick={handleItemClick}
        />
        <NavItem
          icon={<FontAwesomeIcon icon={faUserTie} />}
          label="Admin Manager"
          selected={selectedItem === "Admin Manager"}
          onItemClick={handleItemClick}
        />
      </ul>
    </nav>
  );
};

export default SideNavbar;
