import { db } from "./firebaseConfig";
import { collection, getDocs, where, query, orderBy, startAt, endAt } from "firebase/firestore";

const pullUsers = async ({ name, email, zipcode, grade } = {}) => {
    try {
        let usersCollectionRef = collection(db, "Users");
        let queries = [];

        if (name !== undefined) {
            const nameParts = name.split(' ');
            console.log(nameParts);
            if (nameParts.length === 1) {
                const searchName = nameParts[0];
                queries.push(
                    query(usersCollectionRef, orderBy('firstName'), startAt(searchName), endAt(searchName + '\uf8ff'))
                );
                queries.push(
                    query(usersCollectionRef, orderBy('lastName'), startAt(searchName), endAt(searchName + '\uf8ff'))
                );
            } else if (nameParts.length > 1) {
                const [firstName, lastName] = nameParts;
                queries.push(
                    query(usersCollectionRef, orderBy('firstName'), startAt(firstName), endAt(firstName + '\uf8ff'))
                );
                queries.push(
                    query(usersCollectionRef, orderBy('lastName'), startAt(lastName), endAt(lastName + '\uf8ff'))
                );
            }
        }
        if (email !== undefined) {
            queries.push(query(usersCollectionRef, where('email', '==', email)));
        }
        if (zipcode !== undefined) {
            queries.push(query(usersCollectionRef, where('zipcode', '==', zipcode)));
        }
        if (grade !== undefined) {
            queries.push(query(usersCollectionRef, where('grade', '==', grade)));
        }

        let usersArray = [];
        let userIds = new Set(); // To avoid duplicates

        if (queries.length === 0) {
            const querySnapshot = await getDocs(usersCollectionRef);
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                usersArray.push({ id: doc.id, ...userData });
            });
        } else {
            for (const q of queries) {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    if (!userIds.has(doc.id)) {
                        const userData = doc.data();
                        usersArray.push({ id: doc.id, ...userData });
                        userIds.add(doc.id);
                    }
                });
            }
        }

        return usersArray;
    } catch (error) {
        console.error("Error retrieving users: ", error.message);
        throw error;
    }
};

export default pullUsers;
