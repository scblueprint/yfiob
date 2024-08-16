import React, { useEffect, useState } from "react";
import styles from "./AdminsListPanel.module.css";
import filterIcon from "../../assets/FilterCircle.svg";
import pullAdmins from "../../firebase/pullAdmins";
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMagnifyingGlass,
	faChevronLeft,
	faChevronRight,
	faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function AdminListPanel() {
	const [admins, setAdmins] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const adminsPerPage = 7;

	useEffect(() => {
		const fetchAdmins = async () => {
			try {
				const adminData = await pullAdmins(); // STEP 1: Create pull admins functions
				setAdmins(adminData);
			} catch (error) {
				console.error("Error fetching admin data: ", error.message);
			}
		};
		fetchAdmins();
	}, []);

  const handleSearch = async () => {
    console.log("Search Query:", searchQuery);
    try {
        let adminData;
        if (searchQuery.trim() === "") {
            adminData = await pullAdmins();
        } else {
            adminData = await pullAdmins({ name: searchQuery });
        }
        setAdmins(adminData);
        setCurrentPage(1); // Reset to the first page on new search
        console.log("Search results:", adminData);
    } catch (error) {
        console.error("Error fetching admin data: ", error.message);
    }
  };

	const indexOfLastAdmin = currentPage * adminsPerPage;
	const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
	const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

	const totalPages = Math.ceil(admins.length / adminsPerPage);

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
						id="admin"
						placeholder="Type Name of Admin"
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
						{currentAdmins.map((admin, index) => (
    <tr key={admin.id}>
        <td
            className={styles.index}
            style={{ backgroundColor: "transparent" }}
        >
            {index + 1}
        </td>
        <td className={styles.name}>{admin.firstName} {admin.lastName}</td>
        <td className={styles.email}>{admin.email}</td>
        <td className={styles.date}>
            {new Date(admin.accountCreationDate.seconds * 1000).toLocaleDateString("en-US")}
        </td>
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
					<div>Export Admin Data</div>
				</button>
			</div>
		</div>
	);
}

export default AdminListPanel;
