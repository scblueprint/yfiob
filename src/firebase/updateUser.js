import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const updateUserToFirestore = async (userId, school, grade, zipcode) => {
  try {
    await updateDoc(doc(db, "Users", userId), {
      school: school,
      grade: grade,
      zipcode: zipcode,
    });
    console.log("User successfully updated with ID: ", userId);
  } catch (error) {
    console.error("Error updating user: ", error.message);
    throw error;
  }
};

export default updateUserToFirestore;
