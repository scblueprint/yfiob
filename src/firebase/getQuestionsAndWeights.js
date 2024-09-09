import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

async function getQuestionsAndWeights() {
  const docRef = doc(db, "assessment data", "questions");

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const allQuestions = docSnap.data().allQuestions;

      const questions = Object.keys(allQuestions); // Array of question names
      const weights = Object.values(allQuestions).map(question => question.weight || {}); // Extracting weights, assuming each question has a 'weight' field

      return { questions, weights };
    } else {
      console.log("Document does not exist.");
      return { questions: [], weights: [] };
    }
  } catch (error) {
    console.error(`Error pulling questions and weights from Firestore: ${error}`);
    return { questions: [], weights: [] };
  }
}

export default getQuestionsAndWeights;
