import React, { useEffect, useState } from "react";
import styles from "./UsersPanel.module.css";
import filterIcon from "../../assets/FilterCircle.svg";
import pullUsers from "../../firebase/pullUsers";
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMagnifyingGlass,
	faChevronLeft,
	faChevronRight,
	faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function UsersPanel() {
	const [users, setUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 7;

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

  const handleSearch = async () => {
    console.log("Search Query:", searchQuery);
    try {
        let userData;
        if (searchQuery.trim() === "") {
            userData = await pullUsers();
        } else {
            userData = await pullUsers({ name: searchQuery });
        }
        setUsers(userData);
        setCurrentPage(1); // Reset to the first page on new search
        console.log("Search results:", userData);
    } catch (error) {
        console.error("Error fetching user data: ", error.message);
    }
  };

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

	const totalPages = Math.ceil(users.length / usersPerPage);

	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
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
							<button
								style={{ border: "none", backgroundColor: "transparent" }}
							>
								<img
									src={filterIcon}
									alt={"Filter Icon"}
									className={styles.filterIcon}
								/>
							</button>
						</Modal.Button>

						<Modal.Content title={"Filter"}>
							Content of the modal goes in here! In this case, filtering UI
							would be in here!
						</Modal.Content>
					</Modal>
				</div>
			</div>
			<div className={styles.tableContainer}>
				<div className={styles.tableWrapper}>
					<table>
						<tbody>
							{currentUsers.map((user, index) => (
								<tr key={user.id}>
									<td
										className={styles.index}
										style={{ backgroundColor: "transparent" }}
									>
										{index + 1}
									</td>
									<td className={styles.name}>{user.firstName} {user.lastName}</td>
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
			<div className={styles.pagination}>
				<button
					onClick={prevPage}
					disabled={currentPage === 1}
					className={styles.arrowButton}
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>
				{[...Array(totalPages).keys()].map((page) => (
					<button
						key={page + 1}
						className={`${currentPage === page + 1 ? styles.activePage : ""}`}
						onClick={() => setCurrentPage(page + 1)}
					>
						{page + 1}
					</button>
				))}
				<button
					onClick={nextPage}
					disabled={currentPage === totalPages}
					className={styles.arrowButton}
				>
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			</div>
			<div className={styles.export}>
				<button>
					<FontAwesomeIcon icon={faArrowUpFromBracket} />
					<div>Export Student Data</div>
				</button>
			</div>
		</div>
	);
}

export default UsersPanel;
