import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

async function getCareerData() {
  try {
    const querySnapshot = await getDocs(collection(db, "career data"));
    let careerDataArray = [];
    querySnapshot.forEach((doc) => {
      /* Should be safe to use doc.data() since it
          is never undefined for query doc snapshots */
      careerDataArray.push(doc.data());
    });
    return careerDataArray;
  } catch (error) {
    console.log(`Error pulling career data from firestore: ${error}`);
    return [];
  }
}

export default getCareerData;
