import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

async function getCareerData() {
  try {
    const querySnapshot = await getDocs(collection(db, "career data"));
    let careerDataArray = [];
    querySnapshot.forEach((doc) => {
      // Combine the document ID with its data
      let docData = doc.data();
      let docEntry = {
        id: doc.id, // This is the name of the document
        ...docData // All fields from the document
      };
      careerDataArray.push(docEntry);
    });
    return careerDataArray;
  } catch (error) {
    console.log(`Error pulling career data from firestore: ${error}`);
    return [];
  }
}

export default getCareerData;
