import React, { useEffect, useState } from "react";
import styles from "./UsersPanel.module.css";
import filterIcon from "../../assets/FilterCircle.svg";
import pullUsers from "../../firebase/pullUsers";
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function UsersPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
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

  const handleUserClick = (userId) => {
    // setSelectedUserId(userId);
  };

  const handleSearch = async () => { // Added async keyword to the function declaration
    console.log("Search Query:", searchQuery);
    try {
      const userData = await pullUsers({ name: searchQuery }); // Assuming pullUsers is correctly defined
      setUsers(userData);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching user data: ", error.message);
    }
  };

  const selectedUser = users.find((user) => user.id === selectedUserId);

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
        <table>
          <tbody>
          {users.map((user, index) => (
              <tr key={user.id} onClick={() => handleUserClick(user.id)}>
                <td className={styles.index}><div className={styles.cellContent}>{index + 1}</div></td>
                <td className={styles.name}><div className={styles.cellContent}>{user.firstName}</div></td>
                <td className={styles.grade}><div className={styles.cellContent}>{user.grade}</div></td>
                <td className={styles.school}><div className={styles.cellContent}>{user.school}</div></td>
                <td className={styles.zipcode}><div className={styles.cellContent}>{user.zipcode}</div></td>
                <td className={styles.email}><div className={styles.cellContent}>{user.email}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {selectedUser && (
        <div>
          <h3>Selected User Details:</h3>
          <p>
            <strong>Name:</strong> {selectedUser.firstName}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>userId:</strong> {selectedUser.id}
          </p>
        </div>
      )} */}
    </div>
  );
}

export default UsersPanel;
