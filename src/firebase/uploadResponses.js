import {firestore} from './firebase';

const uploadResponsesToFirestore = async () => {
    try {
        const assessmentID = await firestore.collection('/users/user1/allAssessments').add({
            date: date,

            question1: {
                title: title,
                response: response
            },

            result: {
                recommendations: {
                    recs: "",
                }
            }
        })
        console.log('Responses successfully uploaded with assessmentID: ', assessmentID.id);
    }

    catch (error){
        console.error("Error uploading data: ", error.message);
        throw error;
    }
};

export default uploadResponsesToFirestore;