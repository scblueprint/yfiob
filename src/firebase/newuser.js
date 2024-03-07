import { firestore } from "./firebaseConfig";
import firebase from "firebase/app";

const addUserToFirestore = async (userId, email, username) => {
  try {
    await firestore.collection("users").doc(userId).set({
      email: email,
      username: username,
      accountCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log("User successfully added with ID: ", userId);

    const adminPanelRef = firestore.collection("admin_panel").doc("user_list");
    const adminPanelSnapshot = await adminPanelRef.get();

    let userList = [];
    if (adminPanelSnapshot.exists) {
      userList = adminPanelSnapshot.data().userList || [];
    }

    userList.push({
      userId: userId,
      username: username,
      email: email,
    });

    await adminPanelRef.set({ userList });
    console.log("User data added to admin panel");
  } catch (error) {
    console.error("Error adding user: ", error.message);
    throw error;
  }
};

export default addUserToFirestore;
