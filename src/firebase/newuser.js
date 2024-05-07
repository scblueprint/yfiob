import { doc, serverTimestamp, setDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

const addUserToFirestore = async (userId, email, firstName) => {
  try {
    //This line creates a documents in firebase with user information
    const userDocRef = doc(db, "Users", userId);
    await setDoc(userDocRef, {
      email: email,
      firstName: firstName,
      accountCreationDate: serverTimestamp(),
      school: null,
      zipcode: null,
      grade: null
    });

    const assessmentsCollectionRef = collection(userDocRef, "assessments");
    const assessmentDocRef = doc(assessmentsCollectionRef); 
    await setDoc(assessmentDocRef, {
        Industries: {
          'Agriculture & Natural Resources': 0.0,
          'Energy': 0.0,
          'Arts, Media, and Entertainment': 0.0,
          'Skilled Trades': 0.0,
          'Engineering': 0.0,
          'Education & Child Development': 0.0,
          'Psychology': 0.0,
          'Ecology & Environmental': 0.0,
          'Health Science and Medical Technology': 0.0,
          'Research & Academia': 0.0,
          'Hospitality, Tourism, and Recreation': 0.0,
          'IT, Software and Hardware Engineering': 0.0,
          'Manufacturing and Product Development': 0.0,
          'Marketing, Sales, Communications': 0.0,
          'Aviation': 0.0,
          'Supply Chain': 0.0,
          'Law, Law Enforcement': 0.0,
          'Business Management & Development': 0.0
      }
      
    });
    console.log("User successfully added with ID: ", userId);

    // TODO: This code below is causing an error
    // Dev tools states that "db.collection is not a function"
    // May need to look into

    // const adminPanelRef = db.collection("admin_panel").doc("user_list");
    // const adminPanelSnapshot = await adminPanelRef.get();
    //
    // let userList = [];
    // if (adminPanelSnapshot.exists) {
    //   userList = adminPanelSnapshot.data().userList || [];
    // }
    //
    // userList.push({
    //   userId: userId,
    //   firstName: firstName,
    //   email: email,
    // });
    //
    // await adminPanelRef.set({ userList });
    // console.log("User data added to admin panel");
  } catch (error) {
    console.error("Error adding user: ", error.message);
    throw error;
  }
};

export default addUserToFirestore;
