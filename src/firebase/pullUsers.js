import { db } from "./firebaseConfig";
import { collection, getDocs, where, query, orderBy, startAt, endAt } from "firebase/firestore";

const pullUsers = async ({ name, email, zipcode, grade } = {}) => {
    try {
        let usersCollectionRef = collection(db, "Users");
        let queries = [];

        if (name !== undefined) {
            queries.push(orderBy('firstName'));
            queries.push(startAt(name));
            queries.push(endAt(name + '\uf8ff')); // This will match any string starting with `name`
        }
        if (email !== undefined) {
            queries.push(where('email', '==', email));
        }
        if (zipcode !== undefined) {
            queries.push(where('zipcode', '==', zipcode));
        }
        if (grade !== undefined) {
            queries.push(where('grade', '==', grade));
        }

        if (queries.length > 0) {
            usersCollectionRef = query(usersCollectionRef, ...queries);
        }

        const querySnapshot = await getDocs(usersCollectionRef);
        const usersArray = [];

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            usersArray.push({ id: doc.id, ...userData });
        });

        return usersArray;
    } catch (error) {
        console.error("Error retrieving users: ", error.message);
        throw error;
    }
};

export default pullUsers;
