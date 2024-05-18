import React, { useEffect, useState } from "react";
import styles from "./UsersPanel.module.css";
import filterIcon from "../../assets/FilterCircle.svg";
import pullUsers from "../../firebase/pullUsers";
import Modal from "../Modal/Modal";

function UsersPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <input type="text" id="student" className={styles.search} />

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
