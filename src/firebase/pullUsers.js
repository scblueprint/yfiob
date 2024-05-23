import { db } from "./firebaseConfig";
import { collection, getDocs, where, query} from "firebase/firestore";

const pullUsers = async ({ name, email, zipcode, grade } = {}) => {
    try {
        let usersCollectionRef = collection(db, "Users");

        if (name !== undefined) {
            usersCollectionRef = query(usersCollectionRef, where('firstName', '==', name));
        }
        if (email !== undefined) {
            usersCollectionRef = query(usersCollectionRef, where('email', '==', email));
        }
        if (zipcode !== undefined) {
            usersCollectionRef = query(usersCollectionRef, where('zipcode', '==', zipcode));
        }
        if (grade !== undefined) {
            usersCollectionRef = query(usersCollectionRef, where('grade', '==', grade));
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

