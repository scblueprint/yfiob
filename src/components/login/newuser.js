import {firestore} from './firebase';

const addUserToFirestore = async (email, password, name) => {
    try {
        //adding the user information to Firestore
        const userID = await firestore.collection('users').add({
            name: name,
            email: email,
            password: password,
        });
        console.log('User successfully added with ID: ', userID.id);
    }
    //If there's an error, rethrow error back to calling function for them to handle.
    catch (error){
        console.error('Error adding user: ', error.message);
        throw error;
    }
};
    
export default addUserToFirestore;