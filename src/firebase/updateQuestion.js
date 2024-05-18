import { db } from "./firebaseConfig";
import { updateDoc, deleteField, doc} from "firebase/firestore";
// function accepts oldQuestion name and a newData object which has a question key(could be old question name or a new question), 
// as well as any number of keys representing the fields the user inputs.
const updateQuestion = async (oldQuestion, newData) => {
    const { question, ...fieldsToUpdate } = newData;
    const docRef = doc(db, 'assessment data', 'questions');
    try {
        const dynamicKey = `allQuestions.${oldQuestion}`
        await updateDoc(docRef, {
            [dynamicKey]: deleteField()
        });
        const newKey = `allQuestions.${question}`
        await updateDoc(docRef, {
            [newKey]: fieldsToUpdate
        });
        console.log('Document updated successfully!');
      } catch (error) {
        console.error('Error updating document: ', error);
      }
};

export default updateQuestion;
