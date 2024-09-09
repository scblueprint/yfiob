import { db } from "./firebaseConfig";
import { collection, getDocs, where, query, orderBy, startAt, endAt } from "firebase/firestore";

const pullAdmins = async ({ name, email, accountDate } = {}) => {
    try {
        let adminsCollectionRef = collection(db, "admin accounts");
        let queries = [];

        if (name !== undefined) {
            const nameParts = name.split(' ');
            console.log(nameParts);
            if (nameParts.length === 1) {
                const searchName = nameParts[0];
                queries.push(
                    query(adminsCollectionRef, orderBy('firstName'), startAt(searchName), endAt(searchName + '\uf8ff'))
                );
                queries.push(
                    query(adminsCollectionRef, orderBy('lastName'), startAt(searchName), endAt(searchName + '\uf8ff'))
                );
            } else if (nameParts.length > 1) {
                const [firstName, lastName] = nameParts;
                queries.push(
                    query(adminsCollectionRef, orderBy('firstName'), startAt(firstName), endAt(firstName + '\uf8ff'))
                );
                queries.push(
                    query(adminsCollectionRef, orderBy('lastName'), startAt(lastName), endAt(lastName + '\uf8ff'))
                );
            }
        }
        if (email !== undefined) {
            queries.push(query(adminsCollectionRef, where('email', '==', email)));
        }
        if (accountDate !== undefined) {
            queries.push(query(adminsCollectionRef, where('accountCreationDate', '==', accountDate)));
        }


        let adminsArray = [];
        let adminIds = new Set(); 

        if (queries.length === 0) {
            const querySnapshot = await getDocs(adminsCollectionRef);
            querySnapshot.forEach((doc) => {
                const adminData = doc.data();
                adminsArray.push({ id: doc.id, ...adminData });
            });
        } else {
            for (const q of queries) {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    if (!adminIds.has(doc.id)) {
                        const adminData = doc.data();
                        adminsArray.push({ id: doc.id, ...adminData });
                        adminIds.add(doc.id);
                    }
                });
            }
        }

        return adminsArray;
    } catch (error) {
        console.error("Error retrieving admins: ", error.message);
        throw error;
    }
};

export default pullAdmins;
