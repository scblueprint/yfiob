import React, { useEffect, useState } from "react";
import styles from "./UsersPanel.module.css";
import filterIcon from "../../assets/FilterCircle.svg";
import pullUsers from "../../firebase/pullUsers";
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function UsersPanel() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await pullUsers(); // Assuming pullUsers is correctly defined
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching user data: ", error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = async () => { 
    console.log("Search Query:", searchQuery);
    try {
      const userData = await pullUsers({ name: searchQuery }); 
      setUsers(userData);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching user data: ", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.filterContainer}>
          <input 
            type="text" 
            id="student" 
            placeholder="Type Name of Student"
            className={styles.search} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />          
          </button>
          <Modal defaultOpen={false}>
            <Modal.Button asChild>
              <button style={{ border: "none", backgroundColor: "transparent" }}>
                <img
                  src={filterIcon}
                  alt={"Filter Icon"}
                  className={styles.filterIcon}
                />
              </button>
            </Modal.Button>

            <Modal.Content title={"Filter"}>
              Content of the modal goes in here! In this case, filtering UI would
              be in here!
            </Modal.Content>
          </Modal>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className={styles.index}>{index + 1}</td>
                  <td className={styles.name}>{user.firstName}</td>
                  <td className={styles.grade}>{user.grade}</td>
                  <td className={styles.school}>{user.school}</td>
                  <td className={styles.zipcode}>{user.zipcode}</td>
                  <td className={styles.email}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default UsersPanel;
