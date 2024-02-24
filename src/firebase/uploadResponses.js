import {firestore} from './firebase';

const uploadResponsesToFirestore = async () => {
    try {
        const assessmentID = await firestore.collection('/Users/User1/All Assessments').add({
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
        console.log('Respones successfully uploaded with assessmentID: ', assessmentID.id);
    }

    catch (error){
        console.error("Error uploading data: ", error.message);
        throw error;
    }
};

export default uploadResponsesToFirestore;