import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

async function getQuestions() {
  try {
    const docRef = doc(db, "assessment data", "questions");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const questionsObject = docSnap.data().allQuestions;
      const questionArray = Object.keys(questionsObject);
      return questionArray;
    } else {
      console.log("Document does not exist.");
      return [];
    }
  } catch (error) {
    console.log(`Error pulling questions from firestore: ${error}`);
    return [];
  }
}

export default getQuestions;