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

      // Filter out empty fields
      const updatedData = Object.entries(fieldsToUpdate)
          .filter(([key, value]) => value !== '')
          .reduce((acc, [key, value]) => {
            acc[key] = parseFloat(value);
            return acc;
          }, {...existingData});

      // Determine the key for update
      const updateKey = oldQuestion !== question ? `allQuestions.${oldQuestion}` : `allQuestions.${question}`;

      // Update or move the question data
      await updateDoc(docRef, {
        [updateKey]: deleteField(),
        [`allQuestions.${question}`]: updatedData
      });

      // Prepare to delete fields with zero values
      const fieldsToDelete = Object.keys(updatedData)
        .filter(key => updatedData[key] === 0)
        .reduce((acc, key) => {
          acc[`allQuestions.${question}.${key}`] = deleteField();
          return acc;
        }, {});

      // Delete zero-value fields
      if (Object.keys(fieldsToDelete).length > 0) {
        await updateDoc(docRef, fieldsToDelete);
      }

      console.log('Document updated successfully!');
  } catch (error) {
      console.error('Error updating document: ', error);
  }
};

export default updateQuestion;
