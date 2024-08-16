import { createUserWithEmailAndPassword,  updateProfile } from "firebase/auth";
import { auth } from "./firebaseConfig";
import addAdminToFirestore from "./newAdmin";

async function signUpAdmin(email, password, firstName, lastName) {
  try {
    
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    //If successfully, user account created and user is logged in
    const user = userCredential.user;
    const userDisplayname = firstName;
    await updateProfile(auth.currentUser, {
      displayName: userDisplayname,
    });
    console.log('The display name is' + user.displayName );


    await addAdminToFirestore(user.uid, email, password, firstName, lastName);
    return user.uid;
  } catch (error) {
    console.log(`Error adding user to firestore: ${error}`);
  }
}

export default signUpAdmin;
