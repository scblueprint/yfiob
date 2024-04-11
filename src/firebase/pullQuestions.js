import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";


async function getQuestions () {
    try {
        const docRef = doc(db, "assessment data", "questions");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const questions = Object.keys(docSnap.data().allQuestions);
            return(questions);
        } else {
            console.log("Document does not exist.");
        }
    } catch (error) {
        console.log(`Error pulling questions from firestore: ${error}`);
    }
};

export default getQuestions;