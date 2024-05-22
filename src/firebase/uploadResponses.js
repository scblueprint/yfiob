// import {firestore} from './firebase';

import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";


export const fetchUserAssessmentRef = async (userId) => {
  console.log("Fetched user assesment Ref");
  const userDocRef = doc(db, "Users", userId);
  const assessmentsCollectionRef = collection(userDocRef, "assessments");

  const querySnapshot = await getDocs(assessmentsCollectionRef);
  const assessmentDocRef = querySnapshot.docs[0].ref; 

  return assessmentDocRef;
};


export const updateUserAssessment = async (userId, industryScores) => {
    try {
      const assessmentDocRef = await fetchUserAssessmentRef(userId);
      console.log("industryScores" + JSON.stringify(industryScores));
      
      await updateDoc(assessmentDocRef, {
        Industries: {
          'Agriculture & Natural Resources': industryScores['Agriculture & Natural Resources'] || 0,
          'Energy': industryScores['Energy'] || 0,
          'Arts, Media, and Entertainment': industryScores['Arts, Media, and Entertainment'] || 0,
          'Skilled Trades': industryScores['Skilled Trades'] || 0,
          'Engineering': industryScores['Engineering'] || 0,
          'Education & Child Development': industryScores['Education & Child Development'] || 0,
          'Psychology': industryScores['Psychology'] || 0,
          'Ecology & Environmental': industryScores['Ecology & Environmental'] || 0,
          'Health Science and Medical Technology': industryScores['Health Science and Medical Technology'] || 0,
          'Research & Academia': industryScores['Research & Academia'] || 0,
          'Hospitality, Tourism, and Recreation': industryScores['Hospitality, Tourism, and Recreation'] || 0,
          'IT, Software and Hardware Engineering': industryScores['IT, Software and Hardware Engineering'] || 0,
          'Manufacturing and Product Development': industryScores['Manufacturing and Product Development'] || 0,
          'Marketing, Sales, Communications': industryScores['Marketing, Sales, Communications'] || 0,
          'Aviation': industryScores['Aviation'] || 0,
          'Supply Chain': industryScores['Supply Chain'] || 0,
          'Law, Law Enforcement': industryScores['Law, Law Enforcement'] || 0,
          'Business Management & Development': industryScores['Business Management & Development'] || 0
        
        }
      });
      console.log("Assessment updated successfully.");
    } catch (error) {
      console.error("Error updating assessment: ", error.message);
    }
  };

  export default updateUserAssessment;
  

// if i then wanted to upload the assesment data to be all 1s for these fields would i 
// use the await updateDoc(fetchUserAssesmentRed(User.ID), {
// field: 1.0,
// field2: (2.0)
//});

// ??

// const uploadResponsesToFirestore = async () => {
//     try {
//         const assessmentID = await firestore.collection('/users/user1/allAssessments').add({
//             date: date,

//             question1: {
//                 title: title,
//                 response: response
//             },

//             result: {
//                 recommendations: {
//                     recs: "",
//                 }
//             }
//         })
//         console.log('Responses successfully uploaded with assessmentID: ', assessmentID.id);
//     }

//     catch (error){
//         console.error("Error uploading data: ", error.message);
//         throw error;
//     }
// };

// export default uploadResponsesToFirestore;