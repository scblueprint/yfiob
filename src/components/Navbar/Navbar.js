import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navWrapper}>
      <nav>
        <ul className={styles.linkList}>
          <li className={styles.linkListItem}>
            <Link to="/" className={styles.linkOptions}>
              Home
            </Link>
          </li>

          <li className={styles.linkListItem}>
            <Link to="/slide2" className={styles.linkOptions}>
              Take Quiz!
            </Link>
          </li>

          <li className={styles.linkListItem}>
            <Link to="/exploreCareers" className={styles.linkOptions}>
              Explore Careers
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
