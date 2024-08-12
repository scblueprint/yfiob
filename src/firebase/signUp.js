import { createUserWithEmailAndPassword,  updateProfile } from "firebase/auth";
import { auth } from "./firebaseConfig";
import addUserToFirestore from "./newuser";

async function signUpUser(email, password, firstName, lastName) {
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

    // await signInWithEmailAndPassword(auth, email, password)
    //   .then(async (userCredentials) => {
    //     // If successful, user is signed in
    //     const user = userCredentials.user;
    //     console.log(`${user.email} is users email`);
    //     console.log(`${user.uid} is users ID`);

    //   })
    //   .catch((error) => {
    //     // Handle errors
   
       
    //     console.error("Error logging in after sign up.");
      
    //   });

    // Add user information into firebase
    // We can add/take away any fields we want be adding
    // or removing function parameters
    await addUserToFirestore(user.uid, email, password, firstName, lastName);
    return user.uid;
  } catch (error) {
    console.log(`Error adding user to firestore: ${error}`);
  }
}

export default signUpUser;
