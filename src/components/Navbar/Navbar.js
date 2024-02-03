import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navWrapper}>
      <nav>
        <ul>
          <li>
            <Link to="/" className={styles.linkOptions}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/" className={styles.linkOptions}>
              Take Quiz!
            </Link>
          </li>

          <li>
            <Link to="/" className={styles.linkOptions}>
              Explore Careers
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
