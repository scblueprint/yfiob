import React, { useEffect, useState } from "react";
import "./AdminPanel.module.css";

import pullUsers from "../../firebase/pullUsers";

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await pullUsers();
                setUsers(userData);
            } catch (error) {
                console.error("Error fetching user data: ", error.message);
            }
        };
        fetchUsers();
    }, []);

    // Handle click on user list item
    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
    };

    // Find the selected user based on the selectedUserId
    const selectedUser = users.find(user => user.id === selectedUserId);

    return (
        <div>
            <h1>Admin Panel</h1>
            <p>This is the Admin Panel.</p>
            <h2>Users:</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => handleUserClick(user.id)}>
                        <strong>Name:</strong> {user.firstName} <br />
                    </li>
                ))}
            </ul>
            
            {selectedUser && (
                <div>
                    <h3>Selected User Details:</h3>
                    <p><strong>Name:</strong> {selectedUser.firstName}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>userId:</strong> {selectedUser.id}</p>
                </div>
            )}
        </div>
    );
}

export default AdminPanel;
