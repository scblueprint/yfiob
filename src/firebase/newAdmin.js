import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const addAdminToFirestore = async (userId, email, firstName, lastName) => {
  try {
    // This line creates a documents in firebase with user information
    const userDocRef = doc(db, "admin accounts", userId);
    await setDoc(userDocRef, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      accountCreationDate: serverTimestamp()
    });


    console.log("Admin successfully added with ID: ", userId);


  } catch (error) {
    console.error("Error adding user: ", error.message);
    throw error;
  }
};

export default addAdminToFirestore;
