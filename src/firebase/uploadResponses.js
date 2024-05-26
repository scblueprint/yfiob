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
      if (!userId){
        console.log("User not logged in, skipping Firestore update.");
        return;
      }
      try{
        const assessmentDocRef = await fetchUserAssessmentRef(userId);
        await updateDoc(assessmentDocRef, {
          Industries: {
            'Agriculture and Natural Resources': industryScores['Agriculture and Natural Resources'] || 0,
            'Energy and Utilities': industryScores['Energy and Utilities'] || 0,
            'Arts, Media, and Entertainment': industryScores['Arts, Media, and Entertainment'] || 0,
            'Skilled Trades': industryScores['Skilled Trades'] || 0,
            'Engineering and Design Industry': industryScores['Engineering and Design Industry'] || 0,
            'Education, Child Development, and Family Services': industryScores['Education, Child Development, and Family Services'] || 0,
            'Psychology': industryScores['Psychology'] || 0,
            'Ecology & Environmental': industryScores['Ecology & Environmental'] || 0,
            'Health Science and Medical Technology': industryScores['Health Science and Medical Technology'] || 0,
            'Research & Academia': industryScores['Research & Academia'] || 0,
            'Hospitality, Tourism, and Recreation': industryScores['Hospitality, Tourism, and Recreation'] || 0,
            'Information Technology': industryScores['Information Technology'] || 0,
            'Manufacturing and Product Development': industryScores['Manufacturing and Product Development'] || 0,
            'Marketing, Sales, and Service': industryScores['Marketing, Sales, and Service'] || 0,
            'Aviation': industryScores['Aviation'] || 0,
            'Supply Chain': industryScores['Supply Chain'] || 0,
            'Law, Law Enforcement': industryScores['Law, Law Enforcement'] || 0,
            'Finance and Business': industryScores['Finance and Business'] || 0,
            'Public Services': industryScores['Public Services'] || 0,
            'Fashion and Interior Design': industryScores['Fashion and Interior Design'] || 0,
            'Building Trades and Construction': industryScores['Building Trades and Construction'] || 0,
            'Transportation': industryScores['Transportation'] || 0
          }
        });
      }

      // console.log("Assessment updated successfully.");
      catch (error) {
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