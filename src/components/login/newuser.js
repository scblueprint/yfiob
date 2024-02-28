import {firestore} from './firebase'; 
import firebase from 'firebase/app'; 

const addUserToFirestore = async (userId, email, username) => {
    try {
        await firestore.collection('users').doc(userId).set({
            
            email: email,
            username: username,
            accountCreationDate: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('User successfully added with ID: ', userId);
    } catch (error) {
        console.error('Error adding user: ', error.message);
        throw error;
    }
};

export default addUserToFirestore;