import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebaseConfig";
import addUserToFirestore from "./newuser";

async function signUpUser(email, password, firstName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    //If successfully, user account created and user is logged in
    const user = userCredential.user;
    const userDisplayname = firstName;
    updateProfile(auth.currentUser, {
      displayName: userDisplayname,
    });
    console.log(user.displayName);

    // Add user information into firebase
    // We can add/take away any fields we want be adding
    // or removing function parameters
    await addUserToFirestore(user.uid, email, firstName);
  } catch (error) {
    console.log(`Error adding user to firestore: ${error}`);
  }
}

export default signUpUser;
