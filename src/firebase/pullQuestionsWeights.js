import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";


async function getQuestionsWeights() {
    try{
      const docRef = doc(db, "assessment data", "questions");
      const docSnap = await getDoc(docRef);
  
      if(docSnap.exists()){
        const weightedQuestionsObject = docSnap.data().allQuestions;
        const weightedQuestionArray = Object.values(weightedQuestionsObject);
        return weightedQuestionArray;
      }
      else {
        console.log("Document does not exist.");
        return [];
      }
    }
    catch(error){
      console.log(`Error pulling weighted questions from firestore: ${error}`);
      return [];
    }
  }
  export default getQuestionsWeights;