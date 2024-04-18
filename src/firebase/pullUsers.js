import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


const pullUsers = async () => {
    try {
        console.log("Fetching all users from the 'Users' collection...");
        
        const usersCollectionRef = collection(db, "Users");
        
        const querySnapshot = await getDocs(usersCollectionRef);
        
        const usersArray = [];
        
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            usersArray.push({ id: doc.id, ...userData });
        });
        
        return usersArray;
    } catch (error){
        console.error("Error retrieving users: ", error.message);
        throw error;
    }
};

export default pullUsers;