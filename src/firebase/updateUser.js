import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const updateUserDoc = async (userId, zipcode, school, grade) => {
    try {
        const userDocRef = doc(db, "Users", userId);
        const updatedFields = {};
        if (zipcode !== null) updatedFields.zipcode = zipcode;
        if (school !== null) updatedFields.school = school;
        if (grade !== null) updatedFields.grade = grade;

        await updateDoc(userDocRef, updatedFields);
    } catch (error) {
      console.error("Error adding user: ", error.message);
      throw error;
    }
  };

export default updateUserDoc;
