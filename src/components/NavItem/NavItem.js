import styles from "./NavItem.module.css";
import { Button } from "@radix-ui/themes";

const NavItem = ({ icon, label, selected, onItemClick }) => {
  const handleClick = () => {
    onItemClick(label);
  };

  return (
    <li className={styles.li}>
      <Button
        onClick={handleClick}
        variant="soft"
        className={selected ? styles["button-selected"] : styles.button}
      >
        <span className={selected ? styles["icon-selected"] : styles.icon}>
          {icon}
        </span>
        <span className={selected ? styles["label-selected"] : styles.label}>
          {label}
        </span>
      </Button>
    </li>
  );
};

export default NavItem;
