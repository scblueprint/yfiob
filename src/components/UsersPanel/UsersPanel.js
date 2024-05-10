import React, { useEffect, useState } from "react";
import styles from "./UsersPanel.module.css";

import pullUsers from "../../firebase/pullUsers";

function UsersPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showPopout, setShowPopout] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //enter constraints here
        const userData = await pullUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching user data: ", error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const selectedUser = users.find((user) => user.id === selectedUserId);

  const handlePopoutButtonClick = () => {
    setShowPopout(!showPopout); // Toggle pop-out visibility
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <input type="text" id="student" className={styles.search} />
        <button
          className={styles.popoutButton}
          onClick={handlePopoutButtonClick}
        >
          Popout
        </button>
        {showPopout && (
          <div className={styles.popout}>
            {/* Content of the popout */}
            <p>This is a pop-out!</p>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleUserClick(user.id)}>
              <td>{user.firstName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
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
      )}
    </div>
  );
}

export default UsersPanel;
