// import {firestore} from './firebase';

import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";


export const fetchUserAssessmentRef = async (userId) => {
  const userDocRef = doc(db, "Users", userId);
  const assessmentsCollectionRef = collection(userDocRef, "assessments");

  const querySnapshot = await getDocs(assessmentsCollectionRef);
  const assessmentDocRef = querySnapshot.docs[0].ref; 

  return assessmentDocRef;
};

// filled with dummy data
// when Lipitha's function is done:
//  - make the map output public
//  - make helper function to extract values
//  - call updateUserAssesment with the output

//  calculateUserScores()
// - returns a map called industries with the key being the industry name and the value being a float 
export const calculateUserScores = async (selectedAnswers, questionWeights) => {
  // Mapping of answer indexes to their respective weights
  const answerWeights = [-1.0, -0.5, 0, 0.5, 1.0];

  // Initialize an object to keep track of the industry scores
  let industryScores = {};

  // Iterate through each question's weights
  Object.entries(questionWeights).forEach(([question, industries], index) => {
      // Get the weight of the user's answer for this question
      const answerWeight = answerWeights[selectedAnswers[index]];

      // Calculate the score for each industry related to this question
      Object.entries(industries).forEach(([industryName, industryWeight]) => {
          // If the industry hasn't been added to industryScores, initialize it
          if (!industryScores[industryName]) {
              industryScores[industryName] = 0;
          }

          // Add the product of the answer weight and the industry weight to the total score for this industry
          industryScores[industryName] += industryWeight * answerWeight;
      });
  });

  // Find the maximum score to use for normalization
  const maxScore = Math.max(...Object.values(industryScores));

  // Normalize the scores
  Object.keys(industryScores).forEach(industry => {
      industryScores[industry] = industryScores[industry] / maxScore;
  });
  console.log(JSON.stringify(industryScores));
  return industryScores;
};

export default calculateUserScores;

export const updateUserAssessment = async (userId) => {
    try {
      const assessmentDocRef = await fetchUserAssessmentRef(userId);
      await updateDoc(assessmentDocRef, {
        Industries: {
            'Agriculture & Natural Resources': 1.0,
            'Energy': 2.0,
            'Arts, Media, and Entertainment': 5.6,
            'Skilled Trades': 6.9,
            'Engineering': 2.0,
            'Education & Child Development': 10.0,
            'Psychology': 12.1,
            'Ecology & Environmental': 5.6,
            'Health Science and Medical Technology': 6.7,
            'Research & Academia': 7.2,
            'Hospitality, Tourism, and Recreation': 8.9,
            'IT, Software and Hardware Engineering': 7.4,
            'Manufacturing and Product Development': 0.0,
            'Marketing, Sales, Communications': 0.0,
            'Aviation': 1.0,
            'Supply Chain': 0.0,
            'Law, Law Enforcement': 0.0,
            'Business Management & Development': 0.0
        }
      });
      console.log("Assessment updated successfully.");
    } catch (error) {
      console.error("Error updating assessment: ", error.message);
    }
  };
  

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