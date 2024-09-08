import { db } from "./firebaseConfig";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";

const updateQuestion = async (oldQuestion, newData) => {
  const { question, ...fieldsToUpdate } = newData;
  const docRef = doc(db, 'assessment data', 'questions');

  try {
      const snap = await getDoc(docRef);
      if (!snap.exists()) {
        console.log("No such document!");
        return;
      }
      
      const questionsData = snap.data().allQuestions;
      const existingData = questionsData[oldQuestion] || {};

      // Convert number fields from strings to floats and filter out zero values
      const updatedData = Object.entries(fieldsToUpdate)
          .filter(([key, value]) => value !== '' && value !== '0')
          .reduce((acc, [key, value]) => {
              acc[key] = parseFloat(value); // Convert string to number
              return acc;
          }, {...existingData});

      if (oldQuestion !== question) {
          await updateDoc(docRef, {
              [`allQuestions.${oldQuestion}`]: deleteField(),
              [`allQuestions.${question}`]: updatedData
          });
      } else {
          await updateDoc(docRef, {
              [`allQuestions.${question}`]: updatedData
          });
      }
      console.log('Document updated successfully!');
  } catch (error) {
      console.error('Error updating document: ', error);
  }
};

export default updateQuestion;
